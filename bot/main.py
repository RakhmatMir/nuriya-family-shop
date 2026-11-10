"""Telegram-бот Nuriya Family Shop.

Покупатель жмёт кнопку «🛍 Do'kon / Магазин» → внутри Telegram открывается сайт-каталог →
в корзине жмёт «Отправить заказ» → бот получает заказ, сам пересчитывает сумму и
пересылает админу, а покупателю пишет «заказ принят».

Настройки — в файле .env рядом (см. .env.example).
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
from pathlib import Path

from aiogram import Bot, Dispatcher, F
from aiogram.client.default import DefaultBotProperties
from aiogram.filters import Command, CommandStart
from aiogram.types import (BotCommand, KeyboardButton, MenuButtonCommands, Message,
                           ReplyKeyboardMarkup, WebAppInfo)

from orders import BadOrder, CatalogSource, admin_text, build_order, buyer_text

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
DATA.mkdir(exist_ok=True)


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env(HERE / ".env")
TOKEN = os.environ.get("BOT_TOKEN", "")
SITE = os.environ.get("SITE_URL", "https://rakhmatmir.github.io/nuriya-family-shop/").rstrip("/") + "/"
ADMIN_USERNAMES = {u.strip().lstrip("@").lower() for u in os.environ.get("ADMIN_USERNAMES", "Dili5000").split(",") if u.strip()}
ADMIN_IDS_ENV = {int(x) for x in os.environ.get("ADMIN_CHAT_IDS", "").replace(" ", "").split(",") if x.lstrip("-").isdigit()}

catalog = CatalogSource(SITE + "js/products.js", HERE / "products.js")
log = logging.getLogger("nuriya-bot")


# ---------- маленькое хранилище: кто админ и номер последнего заказа ----------
def _read(name: str, default):
    try:
        return json.loads((DATA / name).read_text(encoding="utf-8"))
    except Exception:
        return default


def _write(name: str, value) -> None:
    tmp = DATA / (name + ".tmp")
    tmp.write_text(json.dumps(value, ensure_ascii=False), encoding="utf-8")
    tmp.replace(DATA / name)


def admin_ids() -> set[int]:
    return ADMIN_IDS_ENV | {int(x) for x in _read("admins.json", [])}


def next_number() -> int:
    n = int(_read("counter.json", 0)) + 1
    _write("counter.json", n)
    return n


# ---------- клавиатура с кнопкой магазина ----------
def shop_keyboard(lang: str) -> ReplyKeyboardMarkup:
    url = f"{SITE}index.html?lang={lang}&tg=1"
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="🛍 Do'kon / Магазин", web_app=WebAppInfo(url=url))]],
        resize_keyboard=True, is_persistent=True,
    )


def user_lang(msg: Message) -> str:
    code = (msg.from_user.language_code or "") if msg.from_user else ""
    return "ru" if code.startswith(("ru", "uk", "be", "kk")) else "uz"


dp = Dispatcher()


@dp.message(CommandStart())
async def start(msg: Message) -> None:
    u = msg.from_user
    if u and u.username and u.username.lower() in ADMIN_USERNAMES:
        ids = set(_read("admins.json", []))
        if msg.chat.id not in ids:
            ids.add(msg.chat.id)
            _write("admins.json", sorted(ids))
            log.info("Подключён админ @%s (%s)", u.username, msg.chat.id)
        await msg.answer("👋 Вы подключены как админ: новые заказы будут приходить сюда.\n"
                         "Siz admin sifatida ulandingiz — yangi buyurtmalar shu yerga keladi.")
    lang = user_lang(msg)
    text = ("Assalomu alaykum! <b>Nuriya Family Shop</b> — bolalar kiyimlari kilolab.\n\n"
            "Pastdagi <b>«🛍 Do'kon / Магазин»</b> tugmasini bosing: katalogni ko'ring, savatga soling "
            "va buyurtmani shu yerdan yuboring.\n\n"
            "Здравствуйте! Детская одежда на вес. Нажмите кнопку <b>«🛍 Do'kon / Магазин»</b> внизу: "
            "выберите вещи, положите в корзину и отправьте заказ прямо отсюда.")
    await msg.answer(text, reply_markup=shop_keyboard(lang))


@dp.message(Command("id"))
async def show_id(msg: Message) -> None:
    await msg.answer(f"ID этого чата: <code>{msg.chat.id}</code>")


@dp.message(F.web_app_data)
async def got_order(msg: Message, bot: Bot) -> None:
    u = msg.from_user
    try:
        order = build_order(msg.web_app_data.data, catalog.get())
    except BadOrder as e:
        log.warning("Плохой заказ от %s: %s", u.id if u else "?", e)
        await msg.answer("Buyurtmani o'qib bo'lmadi, qaytadan urinib ko'ring.\n"
                         "Не получилось прочитать заказ, попробуйте ещё раз.",
                         reply_markup=shop_keyboard(user_lang(msg)))
        return

    cat = catalog.get()
    number = next_number()
    text = admin_text(order, number, u.id, u.username, u.full_name)
    delivered = 0
    for chat_id in admin_ids():
        try:
            await bot.send_message(chat_id, text)
            delivered += 1
        except Exception as e:  # админ заблокировал бота и т. п.
            log.error("Не доставлен заказ №%s админу %s: %s", number, chat_id, e)
    if not delivered:
        log.error("Заказ №%s никому не доставлен! Текст:\n%s", number, text)

    await msg.answer(buyer_text(order, number, cat.admin or "Dili5000"),
                     reply_markup=shop_keyboard(order.lang))
    log.info("Заказ №%s: %s кг, %s сум, админам: %s", number, order.total_kg, order.total, delivered)


async def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    if not TOKEN or ":" not in TOKEN:
        raise SystemExit("В файле .env не указан BOT_TOKEN")
    bot = Bot(TOKEN, default=DefaultBotProperties(parse_mode="HTML"))
    me = await bot.get_me()
    log.info("Бот @%s запущен, сайт %s, админов подключено: %s", me.username, SITE, len(admin_ids()))
    await bot.set_my_commands([BotCommand(command="start", description="Do'kon / Магазин")])
    # Меню-кнопка — обычный список команд: заказ из каталога работает только через кнопку внизу
    await bot.set_chat_menu_button(menu_button=MenuButtonCommands())
    await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())


if __name__ == "__main__":
    asyncio.run(main())
