/* Общая логика: язык, корзина, шапка, подвал, карточки товаров. */
(function () {
  "use strict";

  /* ---------- Тексты на двух языках ---------- */
  const T = {
    uz: {
      topAddr: "Farg'ona, Vatniy — «Meros» do'koni yonida", topHours: "Ish vaqti 9:00–19:00",
      navCatalog: "Katalog", navHow: "Qanday xarid qilinadi", navContacts: "Manzil", cart: "Savat",
      tagline: "Oilaviy do'kon",
      heroTitle: "Bolalar kiyimi — <em>kilosi</em> bilan",
      heroLead: "Saralangan eksport kiyimlar: chaqaloqlardan o'smirlargacha. Yoqqanini tanlaysiz, tarozida tortamiz, kilosiga to'laysiz.",
      heroCta: "Katalogni ko'rish", heroCall: "Qo'ng'iroq qilish",
      tagPer: "1 kg narxi<br>donalab olganda", stamp: "Ulgurji 5 kg dan",
      howTitle: "Kilosi bilan xarid qilish oson",
      how1: "Tanlang", how1p: "Saytda yoki do'konda yoqqan kiyimlarni tanlang — xohlagancha aralashtirishingiz mumkin.",
      how2: "Torting", how2p: "Tanlangan kiyimlar tarozida tortiladi. Narx — umumiy og'irlikka qarab.",
      how3: "To'lang", how3p: "Naqd pul yoki Click orqali. Oldindan to'lov ham mumkin.",
      tierRetail: "Donalab", tierOpt: "Ulgurji — 5 kg dan", perKg: "so'm / kg", cur: "so'm",
      priceNote: "Narxlar Telegram kanalimizdan olingan. Aniq narxni admin bilan aniqlashtiring.",
      catTitle: "Katalog", found: "ta mahsulot", emptyCat: "Bu bo'limda hozircha mahsulot yo'q.",
      hit: "XIT", photosN: "foto", add: "Savatga qo'shish", added: "Savatga qo'shildi", addedMore: "+{a} kg qo'shildi — endi {n} kg", goCart: "Savatga o'tish",
      visitTitle: "Do'konimizga <em>keling</em>", visitText: "Barcha kiyimlar do'konda mavjud — kelib, ushlab ko'rib, o'zingiz tanlang. Ulgurji xaridorlar uchun alohida narx.",
      addr: "Manzil", addrV: "Farg'ona shahri, Vatniy", addrS: "«Meros» do'koni yonida", hours: "Ish vaqti", hoursV: "9:00 dan 19:00 gacha",
      phone: "Telefon", pay: "To'lov", payV: "Naqd yoki Click", map: "Xaritada ochish",
      footer: "Nuriya Family Shop — Farg'ona", footerNote: "Sayt sinov rejimida: buyurtma admin orqali qabul qilinadi.",
      home: "Bosh sahifa", sizes: "O'lcham", features: "Xususiyatlari", about: "Tavsif",
      kg: "kg", qty: "Og'irlik", lineTotal: "Taxminiy narx:", askText: "Rang va o'lcham bo'yicha savol bormi? Admin tezda javob beradi.",
      askBtn: "Adminga yozish", related: "Sizga yoqishi mumkin", notFound: "Mahsulot topilmadi.", back: "Katalogga qaytish",
      cartTitle: "Savat", cartEmpty: "Savat hozircha bo'sh", cartEmptyP: "Katalogdan yoqqan kiyimlarni tanlang.",
      remove: "O'chirish", summary: "Buyurtma", totalKg: "Umumiy og'irlik", pricePer: "1 kg narxi", total: "Jami",
      toOpt: "Ulgurji narxgacha yana {n} kg qoldi", optOn: "Ulgurji narx qo'llandi — 5 kg dan ortiq!",
      checkout: "Buyurtma berish", checkoutNote: "Hozircha buyurtma Telegram orqali admin bilan rasmiylashtiriladi.",
      orderName: "Ismingiz", orderPhone: "Telefon raqamingiz", orderSend: "Buyurtmani yuborish",
      orderNoteTg: "Buyurtma do'kon adminiga yuboriladi, u siz bilan bog'lanadi.", phoneBad: "Telefon raqamini to'liq kiriting",
      clear: "Savatni tozalash", approx: "Yakuniy narx do'konda tortilgandan keyin aniqlanadi."
    },
    ru: {
      topAddr: "Фергана, Ватный — рядом с магазином «Мерос»", topHours: "Работаем 9:00–19:00",
      navCatalog: "Каталог", navHow: "Как купить", navContacts: "Адрес", cart: "Корзина",
      tagline: "Семейный магазин",
      heroTitle: "Детская одежда — <em>на вес</em>",
      heroLead: "Отборная экспортная одежда: от малышей до подростков. Выбираете что нравится, мы взвешиваем, вы платите за килограмм.",
      heroCta: "Смотреть каталог", heroCall: "Позвонить",
      tagPer: "цена за 1 кг<br>в розницу", stamp: "Опт от 5 кг",
      howTitle: "Покупать на вес — просто",
      how1: "Выберите", how1p: "На сайте или в магазине выберите понравившиеся вещи — можно смешивать любые.",
      how2: "Взвесим", how2p: "Выбранные вещи взвешиваются. Цена зависит от общего веса.",
      how3: "Оплатите", how3p: "Наличными или через Click. Возможна предоплата.",
      tierRetail: "В розницу", tierOpt: "Оптом — от 5 кг", perKg: "сум / кг", cur: "сум",
      priceNote: "Цены взяты из нашего Telegram-канала. Точную цену уточняйте у админа.",
      catTitle: "Каталог", found: "товаров", emptyCat: "В этом разделе пока нет товаров.",
      hit: "ХИТ", photosN: "фото", add: "В корзину", added: "Добавлено в корзину", addedMore: "Добавлено +{a} кг — теперь {n} кг", goCart: "Перейти в корзину",
      visitTitle: "Приходите <em>в магазин</em>", visitText: "Все вещи в наличии — приходите, посмотрите и выберите сами. Для оптовых покупателей — отдельная цена.",
      addr: "Адрес", addrV: "г. Фергана, Ватный", addrS: "рядом с магазином «Мерос»", hours: "Время работы", hoursV: "с 9:00 до 19:00",
      phone: "Телефон", pay: "Оплата", payV: "Наличные или Click", map: "Открыть на карте",
      footer: "Nuriya Family Shop — Фергана", footerNote: "Сайт работает в тестовом режиме: заказ принимает админ.",
      home: "Главная", sizes: "Размер", features: "Особенности", about: "Описание",
      kg: "кг", qty: "Вес", lineTotal: "Примерная цена:", askText: "Есть вопрос по цвету или размеру? Админ быстро ответит.",
      askBtn: "Написать админу", related: "Вам может понравиться", notFound: "Товар не найден.", back: "Вернуться в каталог",
      cartTitle: "Корзина", cartEmpty: "Корзина пока пуста", cartEmptyP: "Выберите понравившиеся вещи в каталоге.",
      remove: "Удалить", summary: "Заказ", totalKg: "Общий вес", pricePer: "Цена за 1 кг", total: "Итого",
      toOpt: "До оптовой цены осталось {n} кг", optOn: "Применена оптовая цена — от 5 кг!",
      checkout: "Оформить заказ", checkoutNote: "Пока заказ оформляется через админа в Telegram.",
      orderName: "Ваше имя", orderPhone: "Ваш телефон", orderSend: "Отправить заказ",
      orderNoteTg: "Заказ уйдёт админу магазина, он с вами свяжется.", phoneBad: "Введите номер телефона полностью",
      clear: "Очистить корзину", approx: "Итоговая цена определяется после взвешивания в магазине."
    }
  };

  /* ---------- Хранилище (с защитой, если браузер его блокирует) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* без сохранения */ } }
  };

  /* ---------- Telegram Mini App: сайт открыт внутри бота ---------- */
  const tg = (window.Telegram && window.Telegram.WebApp) || null;
  const inTG = !!(tg && tg.platform && tg.platform !== "unknown");
  // Отправить заказ боту можно, только если каталог открыт кнопкой внизу чата (у неё нет query_id)
  const canSend = inTG && typeof tg.sendData === "function" && !(tg.initDataUnsafe && tg.initDataUnsafe.query_id);
  if (inTG) {
    try { tg.ready(); tg.expand(); tg.setHeaderColor("#18130d"); tg.setBackgroundColor("#18130d"); } catch (e) { /* старый Telegram */ }
    document.documentElement.classList.add("in-tg");
  }

  const urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang && T[urlLang] && store.get("nfs-lang", null) === null) store.set("nfs-lang", urlLang);
  let lang = store.get("nfs-lang", "uz");
  if (!T[lang]) lang = "uz";
  const t = (k) => (T[lang][k] !== undefined ? T[lang][k] : k);

  /* ---------- Иконки (свои SVG, одна толщина линии) ---------- */
  const P = {
    bag: '<path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>', check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    phone: '<path d="M5 4.5h3.2l1.6 4-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2 4 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 6.1 1.5 1.5 0 0 1 5 4.5Z"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    send: '<path d="M21 3.5 3.5 10.6l6.4 2.6 2.6 6.3L21 3.5Z"/><path d="m9.9 13.2 4.6-4.6"/>',
    insta: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
    hanger: '<path d="M12 7.5a2 2 0 1 1 2-2"/><path d="M12 7.5v1.2L3.6 15a1.2 1.2 0 0 0 .7 2.2h15.4a1.2 1.2 0 0 0 .7-2.2L12 8.7"/>',
    scale: '<path d="M12 4v16M7 20h10M5 8h14"/><path d="m5 8-2.5 6a2.5 2.5 0 0 0 5 0L5 8Zm14 0-2.5 6a2.5 2.5 0 0 0 5 0L19 8Z"/>',
    wallet: '<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3"/><rect x="4" y="8" width="16" height="11" rx="2"/><path d="M16 13.5h.5"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M7 7l.8 12h8.4L17 7"/>',
    left: '<path d="m14.5 6-6 6 6 6"/>', right: '<path d="m9.5 6 6 6-6 6"/>',
    image: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9.5" r="1.5"/><path d="m5 17 4.5-4.5L14 17l2.5-2.5L20 18"/>'
  };
  const icon = (n) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;

  /* ---------- Деньги и вес ---------- */
  const money = (n) => Math.round(n).toLocaleString("ru-RU").replace(/ /g, " ");
  const kgFmt = (n) => (Math.round(n * 10) / 10).toString().replace(".", lang === "ru" ? "," : ".");
  const STEP = 0.5, MIN = 0.5, MAX = 50;

  /* ---------- Корзина ---------- */
  const cart = {
    items() { const v = store.get("nfs-cart", []); return Array.isArray(v) ? v.filter(i => i && byId(i.id)) : []; },
    save(list) { store.set("nfs-cart", list); updateBadge(); },
    totalKg() { return cart.items().reduce((s, i) => s + (Number(i.kg) || 0), 0); },
    pricePerKg(kg) { return kg >= SHOP.optMinKg ? SHOP.priceOpt : SHOP.priceRetail; },
    add(id, kg) {
      const list = cart.items(); const f = list.find(i => i.id === id);
      if (f) f.kg = Math.min(MAX, f.kg + kg); else list.push({ id, kg });
      cart.save(list);
    },
    setKg(id, kg) { const list = cart.items(); const f = list.find(i => i.id === id); if (f) { f.kg = Math.max(MIN, Math.min(MAX, kg)); cart.save(list); } },
    remove(id) { cart.save(cart.items().filter(i => i.id !== id)); },
    clear() { cart.save([]); }
  };

  function byId(id) { return (window.PRODUCTS || []).find(p => p.id === id); }
  const photo = (p, n) => `img/${p.id}-${n || 1}.jpg`;
  const L = (p) => p[lang] || p.uz;

  function updateBadge() {
    const n = cart.items().length;
    document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = n; });
  }

  /* ---------- Шапка и подвал ---------- */
  function renderChrome() {
    const top = document.getElementById("topbar");
    if (top) top.innerHTML = `<div class="wrap">
      <a href="https://maps.google.com/?q=Farg'ona+Vatniy+Meros" target="_blank" rel="noopener">${icon("pin")}<span>${t("topAddr")}</span></a>
      <span class="hide-sm" style="gap:6px;align-items:center">${icon("clock")} ${t("topHours")}</span>
      <a class="hide-sm" href="tel:${SHOP.phone}">${icon("phone")} ${SHOP.phoneShow}</a></div>`;

    const head = document.getElementById("header");
    if (head) head.innerHTML = `<div class="wrap">
      <a class="logo" href="index.html" aria-label="Nuriya Family Shop">
        <span class="logo-mark">NF</span>
        <span class="logo-text">Nuriya<small>Family shop</small></span>
      </a>
      <nav class="nav" aria-label="Menu">
        <a href="index.html#catalog">${t("navCatalog")}</a>
        <a href="index.html#how">${t("navHow")}</a>
        <a href="index.html#visit">${t("navContacts")}</a>
      </nav>
      <div class="lang" role="group" aria-label="Til / Язык">
        <button type="button" data-lang="uz" aria-pressed="${lang === "uz"}">UZ</button>
        <button type="button" data-lang="ru" aria-pressed="${lang === "ru"}">RU</button>
      </div>
      <a class="cart-btn" href="cart.html" aria-label="${t("cart")}">${icon("bag")}<span class="label">${t("cart")}</span><span class="count tabnum" data-cart-count>0</span></a>
    </div>`;

    const foot = document.getElementById("footer");
    if (foot) foot.innerHTML = `<div class="wrap"><span>© 2026 ${t("footer")}</span><span>${t("footerNote")}</span></div>`;

    document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang; store.set("nfs-lang", lang);
      document.documentElement.lang = lang === "uz" ? "uz" : "ru";
      renderAll();
    }));
    updateBadge();
  }

  /* Тексты с атрибутом data-t */
  function fillTexts() {
    document.querySelectorAll("[data-t]").forEach(el => { el.innerHTML = t(el.dataset.t); });
    document.querySelectorAll("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon); });
    document.querySelectorAll("[data-price='retail']").forEach(el => { el.textContent = money(SHOP.priceRetail); });
    document.querySelectorAll("[data-price='opt']").forEach(el => { el.textContent = money(SHOP.priceOpt); });
  }

  /* ---------- Уведомление ---------- */
  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.innerHTML = `${icon("check")}<span>${msg}</span><a href="cart.html">${t("goCart")} →</a>`;
    el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
    const b = document.querySelector(".cart-btn"); if (b) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  }

  /* ---------- Карточка товара ---------- */
  function cardHTML(p) {
    const l = L(p);
    return `<article class="card">
      <div class="ph">
        <img class="fade" src="${photo(p)}" alt="${l.name}" loading="lazy" width="400" height="500">
        ${p.hit ? `<span class="badge">${t("hit")}</span>` : ""}
        ${p.photos > 1 ? `<span class="count-ph">${icon("image")}${p.photos}</span>` : ""}
      </div>
      <div class="body">
        <h3><a href="product.html?id=${p.id}">${l.name}</a></h3>
        <p class="short">${l.short}</p>
        <div class="foot">
          <div class="price tabnum">${money(SHOP.priceRetail)}<small>${t("perKg")}</small></div>
          <button class="add" type="button" data-add="${p.id}" aria-label="${t("add")}: ${l.name}">${icon("plus")}</button>
        </div>
      </div>
    </article>`;
  }

  /* Добавить в корзину + сообщение: если товар уже был — показываем, сколько стало */
  function addToCart(id, kg, imgEl) {
    const before = cart.items().find(i => i.id === id);
    cart.add(id, kg);
    const now = cart.items().find(i => i.id === id);
    flyToCart(imgEl);
    toast(before ? t("addedMore").replace("{a}", kgFmt(kg)).replace("{n}", kgFmt(now.kg)) : t("added"));
  }

  function bindAdd(root) {
    (root || document).querySelectorAll("[data-add]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); e.stopPropagation();
        const card = btn.closest(".card");
        addToCart(btn.dataset.add, 1, card && card.querySelector(".ph img"));
        btn.classList.add("done"); btn.innerHTML = icon("check");
        clearTimeout(btn._t);
        btn._t = setTimeout(() => { btn.classList.remove("done"); btn.innerHTML = icon("plus"); }, 1400);
      });
    });
  }

  /* ---------- Анимации ---------- */
  /* Если в системе выключены анимации — «спокойный» режим (только плавные появления).
     Для проверки полной версии можно открыть страницу с ?motion=full */
  const forceFull = /[?&]motion=full/.test(location.search);
  const reduced = !forceFull && (() => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } })();
  document.documentElement.classList.add("motion");
  if (reduced) document.documentElement.classList.add("calm");

  /* Фото товара «летит» в корзину */
  function flyToCart(img) {
    const target = document.querySelector(".cart-btn .count");
    const done = () => { if (target) { target.classList.remove("tick"); void target.offsetWidth; target.classList.add("tick"); } };
    if (reduced || !img || !target || !img.animate) { done(); return; }
    const a = img.getBoundingClientRect(), b = target.getBoundingClientRect();
    if (!a.width) { done(); return; }
    const size = Math.min(a.width, 120);
    const clone = img.cloneNode();
    clone.removeAttribute("loading"); clone.className = "fly"; clone.style.viewTransitionName = "none";
    Object.assign(clone.style, { width: size + "px", height: size * 1.2 + "px", left: (a.left + a.width / 2 - size / 2) + "px", top: (a.top + a.height / 2 - size * .6) + "px" });
    document.body.appendChild(clone);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    clone.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * .55}px, ${dy * .2 - 60}px) scale(.55) rotate(-8deg)`, opacity: 1, offset: .55 },
      { transform: `translate(${dx}px, ${dy}px) scale(.12) rotate(-14deg)`, opacity: .6 }
    ], { duration: 750, easing: "cubic-bezier(.5,0,.2,1)" }).onfinish = () => { clone.remove(); done(); };
  }

  /* Фото появляются мягко, когда загрузились */
  function fadeImages(root) {
    (root || document).querySelectorAll("img.fade:not(.in)").forEach(img => {
      const show = () => { img.classList.add("in"); if (img.parentElement) img.parentElement.classList.add("loaded"); };
      if (img.complete && img.naturalWidth) show();
      else { img.addEventListener("load", show, { once: true }); img.addEventListener("error", show, { once: true }); }
    });
  }

  /* Появление блоков при прокрутке */
  let io = null;
  function reveal(root) {
    const els = (root || document).querySelectorAll(".reveal:not(.shown)");
    if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("shown")); return; }
    if (!io) io = new IntersectionObserver((entries) => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("shown"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    els.forEach(el => io.observe(el));
  }

  /* Шапка с тенью при прокрутке + лёгкий параллакс фото первого экрана */
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const h = document.querySelector(".header"); if (h) h.classList.toggle("scrolled", y > 8);
      if (!reduced && y < 900 && window.innerWidth >= 900) {
        document.querySelectorAll(".hero-photos img").forEach((img, i) => { img.style.translate = `0 ${(y * [0.06, -0.05, 0.1][i]).toFixed(1)}px`; });
      }
      if (!reduced) scrollMotion();
      ticking = false;
    });
  }
  /* Движение блоков главной при прокрутке.
     p — где элемент на экране: +1 внизу экрана, 0 в центре, −1 вверху */
  function scrollMotion() {
    const vh = window.innerHeight;
    const pos = (el) => { const r = el.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return null; return Math.max(-1.2, Math.min(1.2, (r.top + r.height / 2 - vh / 2) / (vh / 2))); };
    const set = (el, name, val) => el.style.setProperty(name, val);
    // Фото в карточках плавают внутри рамки
    document.querySelectorAll(".grid .card .ph img").forEach(img => { const p = pos(img.parentElement); if (p !== null) set(img, "--py", (p * -10).toFixed(1) + "px"); });
    // Заголовки разделов выезжают сбоку, пока блок поднимается к центру
    document.querySelectorAll(".drift").forEach((el, i) => { const p = pos(el); if (p !== null) set(el, "--dx", (Math.max(0, p) * (i % 2 ? -70 : 70)).toFixed(1) + "px"); });
    // Иконки «как купить» поворачиваются
    document.querySelectorAll(".how li .ic").forEach((el, i) => { const p = pos(el); if (p !== null) set(el, "--rot", (p * (i % 2 ? -30 : 30)).toFixed(1) + "deg"); });
    // Две строки цен съезжаются навстречу друг другу
    document.querySelectorAll(".tiers .tier").forEach((el, i) => { const p = pos(el); if (p !== null) set(el, "--tx", (Math.max(0, p) * (i % 2 ? 60 : -60)).toFixed(1) + "px"); });
    // Кнопки соцсетей поднимаются лесенкой
    document.querySelectorAll(".visit .socials a").forEach((el, i) => { const p = pos(el); if (p !== null) set(el, "--sy", (Math.max(0, p) * (24 + i * 18)).toFixed(1) + "px"); });
  }
  function initDrift() {
    document.querySelectorAll(".how h2, .cat-head .section-title, .visit h2, .related .section-title").forEach(el => el.classList.add("drift"));
  }
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Любая перерисовка (смена раздела, удаление из корзины) — новые фото и блоки тоже анимируются */
  let moQueued = false;
  new MutationObserver(() => {
    if (moQueued) return; moQueued = true;
    requestAnimationFrame(() => { moQueued = false; fadeImages(); reveal(); initDrift(); onScroll(); });
  }).observe(document.documentElement, { childList: true, subtree: true });

  /* Плавный переход «фото карточки → фото на странице товара» */
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="product.html"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    document.querySelectorAll("img").forEach(i => { if (i.style.viewTransitionName) i.style.viewTransitionName = ""; });
    const scope = a.closest(".card, .cart-item");
    const img = scope && scope.querySelector("img");
    if (img) img.style.viewTransitionName = "photo";
  });
  window.addEventListener("pageshow", () => {
    document.querySelectorAll(".card img, .cart-item img").forEach(i => { i.style.viewTransitionName = ""; });
  });

  /* Плавно пересчитать число (для сумм) */
  function tween(el, to, fmt) {
    const from = Number(el.dataset.val || to);
    el.dataset.val = to;
    if (reduced || from === to) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 600;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* Стрелки +/− */
  function stepper(value, onChange) {
    const wrap = document.createElement("div");
    wrap.className = "stepper";
    wrap.innerHTML = `<button type="button" data-d="-1" aria-label="−">${icon("minus")}</button>
      <output class="tabnum" aria-live="polite"></output>
      <button type="button" data-d="1" aria-label="+">${icon("plus")}</button>`;
    const out = wrap.querySelector("output");
    const draw = (anim) => {
      out.textContent = `${kgFmt(value)} ${t("kg")}`;
      if (anim && !reduced) { out.classList.remove("flip"); void out.offsetWidth; out.classList.add("flip"); }
      wrap.querySelector('[data-d="-1"]').disabled = value <= MIN;
      wrap.querySelector('[data-d="1"]').disabled = value >= MAX;
    };
    wrap.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      value = Math.max(MIN, Math.min(MAX, value + STEP * Number(b.dataset.d)));
      draw(true); onChange(value);
    }));
    draw();
    return wrap;
  }

  /* ---------- Перерисовка страницы при смене языка ---------- */
  let pageRender = null;
  function renderAll() {
    document.documentElement.lang = lang;
    renderChrome(); fillTexts();
    if (pageRender) pageRender();
    fadeImages(); reveal(); initDrift(); onScroll();
  }

  window.NFS = {
    t, icon, money, kgFmt, cart, byId, photo, L, cardHTML, bindAdd, stepper, toast,
    addToCart, flyToCart, fadeImages, reveal, tween, reduced,
    tg, inTG, canSend,
    get lang() { return lang; },
    page(fn) { pageRender = fn; renderAll(); }
  };

  document.addEventListener("DOMContentLoaded", () => { if (!pageRender) renderAll(); });
})();
