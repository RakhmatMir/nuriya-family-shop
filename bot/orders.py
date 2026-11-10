"""Каталог и расчёт заказа для бота Nuriya Family Shop.

Цены и названия берутся из того же файла js/products.js, что и на сайте,
поэтому менять их нужно только в одном месте. Сумму бот всегда считает сам —
цифрам, пришедшим из телефона покупателя, не доверяем.
"""
from __future__ import annotations

import html
import json
import re
import time
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

MIN_KG, MAX_KG, STEP = 0.5, 50.0, 0.5
MAX_ITEMS = 60


@dataclass
class Catalog:
    price_retail: int
    price_opt: int
    opt_min_kg: float
    admin: str
    names: dict[str, dict[str, str]] = field(default_factory=dict)  # id -> {"uz":..., "ru":...}


def _num(src: str, key: str, default: float) -> float:
    m = re.search(rf"{key}\s*:\s*([\d.]+)", src)
    return float(m.group(1)) if m else default


def parse_catalog(src: str) -> Catalog:
    """Разбирает js/products.js (простым поиском, без запуска JS)."""
    m = re.search(r'admin\s*:\s*"([^"]+)"', src)
    cat = Catalog(
        price_retail=int(_num(src, "priceRetail", 210000)),
        price_opt=int(_num(src, "priceOpt", 190000)),
        opt_min_kg=_num(src, "optMinKg", 5),
        admin=m.group(1) if m else "",
    )
    start = src.find("window.PRODUCTS")
    body = src[start:] if start >= 0 else ""
    starts = [x for x in re.finditer(r'\bid\s*:\s*"([^"]+)"\s*,\s*cat\s*:', body)]
    for i, s in enumerate(starts):
        chunk = body[s.start(): starts[i + 1].start() if i + 1 < len(starts) else len(body)]
        names = {}
        for lang in ("uz", "ru"):
            n = re.search(rf'\b{lang}\s*:\s*\{{\s*name\s*:\s*"((?:[^"\\]|\\.)*)"', chunk)
            if n:
                names[lang] = n.group(1).replace('\\"', '"').replace("\\'", "'")
        cat.names[s.group(1)] = names
    return cat


class CatalogSource:
    """Загружает каталог с сайта (кэш 10 минут); если сайт недоступен — из копии рядом."""

    def __init__(self, url: str, fallback: Path, ttl: int = 600):
        self.url, self.fallback, self.ttl = url, fallback, ttl
        self._cat: Catalog | None = None
        self._at = 0.0

    def get(self) -> Catalog:
        if self._cat and time.time() - self._at < self.ttl:
            return self._cat
        try:
            with urllib.request.urlopen(f"{self.url}?t={int(time.time())}", timeout=10) as r:
                cat = parse_catalog(r.read().decode("utf-8"))
            if not cat.names:
                raise ValueError("в каталоге нет товаров")
        except Exception:
            if self._cat:  # сайт временно недоступен — оставляем прошлую версию
                return self._cat
            cat = parse_catalog(self.fallback.read_text(encoding="utf-8"))
        self._cat, self._at = cat, time.time()
        return cat


@dataclass
class Order:
    lang: str
    lines: list[tuple[str, float]]  # (название, кг)
    unknown: int
    total_kg: float
    per_kg: int
    total: int
    is_opt: bool
    name: str
    phone: str


class BadOrder(ValueError):
    pass


def _clean(s, limit: int) -> str:
    return re.sub(r"\s+", " ", str(s or "")).strip()[:limit]


def build_order(raw: str, cat: Catalog) -> Order:
    try:
        data = json.loads(raw)
    except (TypeError, ValueError):
        raise BadOrder("не JSON")
    if not isinstance(data, dict) or not isinstance(data.get("items"), list):
        raise BadOrder("нет списка товаров")
    lang = data.get("lang") if data.get("lang") in ("uz", "ru") else "uz"

    merged: dict[str, float] = {}
    unknown = 0
    for it in data["items"][:MAX_ITEMS]:
        if not isinstance(it, dict):
            continue
        pid = str(it.get("id", ""))
        try:
            kg = float(it.get("kg"))
        except (TypeError, ValueError):
            continue
        if kg != kg:  # NaN
            continue
        kg = round(min(MAX_KG, max(MIN_KG, kg)) / STEP) * STEP
        if pid not in cat.names:
            unknown += 1
            continue
        merged[pid] = min(MAX_KG, merged.get(pid, 0) + kg)
    if not merged:
        raise BadOrder("пустой заказ")

    lines = [(cat.names[p].get(lang) or cat.names[p].get("uz") or p, kg) for p, kg in merged.items()]
    total_kg = round(sum(merged.values()), 1)
    is_opt = total_kg >= cat.opt_min_kg
    per = cat.price_opt if is_opt else cat.price_retail
    phone = re.sub(r"[^\d+]", "", str(data.get("phone") or ""))[:16]
    return Order(lang, lines, unknown, total_kg, per, round(total_kg * per), is_opt,
                 _clean(data.get("name"), 60), phone)


def money(n: float) -> str:
    return f"{round(n):,}".replace(",", " ")


def kg_fmt(n: float, lang: str = "ru") -> str:
    s = f"{n:g}"
    return s.replace(".", ",") if lang == "ru" else s


def admin_text(o: Order, number: int, user_id: int, username: str | None, full_name: str) -> str:
    """Сообщение для админа магазина (по-русски и по-узбекски кратко)."""
    e = html.escape
    rows = "\n".join(f"• {e(n)} — <b>{kg_fmt(kg)} кг</b>" for n, kg in o.lines)
    who = f'<a href="tg://user?id={user_id}">{e(full_name or "покупатель")}</a>'
    if username:
        who += f" (@{e(username)})"
    parts = [
        f"🛍 <b>Новый заказ №{number}</b> / Yangi buyurtma",
        "",
        rows,
        "",
        f"Общий вес: <b>{kg_fmt(o.total_kg)} кг</b>",
        f"Цена за 1 кг: {money(o.per_kg)} сум" + (" (опт)" if o.is_opt else ""),
        f"Итого: <b>{money(o.total)} сум</b> (точно — после взвешивания)",
        "",
        f"Имя: {e(o.name) if o.name else '—'}",
        f"Телефон: {e(o.phone) if o.phone else '—'}",
        f"Telegram: {who}",
        f"Язык покупателя: {'узбекский' if o.lang == 'uz' else 'русский'}",
    ]
    if o.unknown:
        parts.append(f"⚠️ {o.unknown} товар(а) уже нет в каталоге — пропущены.")
    return "\n".join(parts)


def buyer_text(o: Order, number: int, admin: str) -> str:
    e = html.escape
    rows = "\n".join(f"• {e(n)} — {kg_fmt(kg, o.lang)} {'kg' if o.lang == 'uz' else 'кг'}" for n, kg in o.lines)
    if o.lang == "ru":
        return (f"✅ <b>Заказ №{number} принят!</b>\n\n{rows}\n\n"
                f"Общий вес: {kg_fmt(o.total_kg, 'ru')} кг\nПримерно: <b>{money(o.total)} сум</b>\n"
                f"Точная сумма — после взвешивания в магазине.\n\n"
                f"Админ скоро с вами свяжется. Вопросы: @{e(admin)}")
    return (f"✅ <b>Buyurtma №{number} qabul qilindi!</b>\n\n{rows}\n\n"
            f"Umumiy og'irlik: {kg_fmt(o.total_kg, 'uz')} kg\nTaxminan: <b>{money(o.total)} so'm</b>\n"
            f"Aniq narx do'konda tortilgandan keyin bo'ladi.\n\n"
            f"Admin tez orada siz bilan bog'lanadi. Savollar: @{e(admin)}")
