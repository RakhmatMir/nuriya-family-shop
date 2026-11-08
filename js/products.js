/* Каталог товаров Nuriya Family Shop.
   Цены — за 1 кг (из канала @kiloli_tavar): розница 210 000 сум, опт от 5 кг — 190 000 сум.
   Фото лежат в папке img/. Чтобы добавить товар — скопируйте блок и поменяйте id, фото и тексты. */

window.SHOP = {
  priceRetail: 210000,   // so'm за 1 кг (дона / поштучно)
  priceOpt: 190000,      // so'm за 1 кг при покупке от 5 кг
  optMinKg: 5,
  phone: "+998994405000",
  phoneShow: "+998 99 440 50 00",
  admin: "Dili5000",
  tgMain: "https://t.me/savdo_sotiq_mustafo_shop",
  tgKilo: "https://t.me/kiloli_tavar",
  instagram: "https://www.instagram.com/nuriya__family__shop/"
};

window.CATEGORIES = [
  { id: "all",       uz: "Hammasi",              ru: "Все товары" },
  { id: "baby",      uz: "Chaqaloqlar uchun",    ru: "Для малышей" },
  { id: "sets",      uz: "Bolalar to'plamlari",  ru: "Детские комплекты" },
  { id: "outer",     uz: "Ustki kiyimlar",       ru: "Верхняя одежда" },
  { id: "knit",      uz: "Sviter va trikotaj",   ru: "Свитеры и трикотаж" },
  { id: "pants",     uz: "Shimlar",              ru: "Брюки" },
  { id: "teen",      uz: "O'smirlar uchun",      ru: "Подростковая" }
];

window.PRODUCTS = [
  {
    id: "dino-set", cat: "sets", photos: 3,
    uz: { name: "Dinozavr rasmli to'plam", short: "Svitshot va jogger shim, issiq ichli",
      desc: "Ikki qismli bolalar to'plami: raglan yengli svitshot old tomonida rangli dinozavrlar rasmi bilan va pastki qismi rezinkali jogger shim. Ichi yumshoq, kundalik kiyish va bog'chaga juda qulay.",
      features: ["Svitshot + shim", "Ichi yumshoq va issiq", "Yengi va pochasi rezinkali", "Ranglari: binafsha, zaytun, sariq"] },
    ru: { name: "Комплект с динозаврами", short: "Свитшот и джоггеры, тёплый",
      desc: "Детский комплект из двух вещей: свитшот с рукавом-реглан и ярким принтом с динозаврами и брюки-джоггеры на резинке. Мягкий внутри, удобен на каждый день и для садика.",
      features: ["Свитшот + брюки", "Мягкий и тёплый внутри", "Манжеты на резинке", "Цвета: сиреневый, оливковый, жёлтый"] }
  },
  {
    id: "bunny-vest", cat: "outer", photos: 3, sizes: "90–120",
    uz: { name: "Quyoncha bilan pushti nimcha", short: "Kapyushonli, yumshoq mo'ynali",
      desc: "Qizchalar uchun yengil va issiq nimcha: kapyushon cheti yumshoq mo'yna bilan bezatilgan, ko'kragida o'yinchoq quyoncha. Kofta yoki svitshot ustidan kiyish uchun ajoyib.",
      features: ["O'lchamlar: 90–100–110–120", "Kapyushon mo'ynali", "Quyoncha o'yinchoq bilan", "Ranglari: krem, pushti, shaftoli, binafsha"] },
    ru: { name: "Жилет с зайчиком", short: "С капюшоном и мягким мехом",
      desc: "Лёгкий и тёплый жилет для девочек: капюшон отделан мягким мехом, на груди — игрушка-зайчик. Отлично смотрится поверх кофты или свитшота.",
      features: ["Размеры: 90–100–110–120", "Капюшон с мехом", "С игрушкой-зайчиком", "Цвета: молочный, розовый, персиковый, сиреневый"] }
  },
  {
    id: "girl-knit", cat: "knit", photos: 2,
    uz: { name: "Marvaridli trikotaj kofta", short: "Qizlar uchun nozik sviter",
      desc: "Mayin trikotajdan tikilgan qizlar koftasi. Yoqasi marvaridsimon munchoqlar bilan bezatilgan, oldida kichik broshka. Pastel ranglarda — maktab va bayram uchun.",
      features: ["Yumshoq trikotaj", "Yoqasi marvaridli", "Pastel ranglar", "Ranglari: binafsha, oq, pushti, jigarrang, sariq"] },
    ru: { name: "Трикотажная кофта с жемчугом", short: "Нежный свитер для девочек",
      desc: "Кофта для девочек из мягкого трикотажа. Ворот украшен бусинами под жемчуг, спереди — небольшая брошь. Пастельные цвета — для школы и праздника.",
      features: ["Мягкий трикотаж", "Ворот с жемчугом", "Пастельные цвета", "Цвета: сиреневый, белый, розовый, коричневый, жёлтый"] }
  },
  {
    id: "baby-knit", cat: "baby", photos: 1,
    uz: { name: "Chaqaloq uchun trikotaj kostyum", short: "Kofta va shim, yalpizrang",
      desc: "Yumshoq to'qilgan kofta va shimdan iborat chaqaloq kostyumi. Koftaning pastki qismi nozik volan bilan. Teriga yoqimli, harakatni cheklamaydi.",
      features: ["Kofta + shim", "To'qilgan mayin mato", "Volanli bezak", "Yalpiz rang"] },
    ru: { name: "Вязаный костюм для малышки", short: "Кофта и брюки, мятный",
      desc: "Костюм для малышки: мягкая вязаная кофта с нежной оборкой и брючки. Приятный к коже и не стесняет движений.",
      features: ["Кофта + брюки", "Мягкая вязка", "Оборка по низу", "Мятный цвет"] }
  },
  {
    id: "baby-print-set", cat: "baby", photos: 6, sizes: "80–100",
    uz: { name: "Rasmli chaqaloq to'plami", short: "Svitshot va shim, 6 xil rang",
      desc: "Kichkintoylar uchun svitshot va shim to'plami. Ko'kragida yoqimli aplikatsiya, yengi kontrast rangda. Ichi issiq, yurishni o'rganayotgan bolalarga qulay.",
      features: ["Svitshot + shim", "Ko'krakda aplikatsiya", "Ichi issiq", "Bir nechta rang varianti"] },
    ru: { name: "Комплект для малышей с аппликацией", short: "Свитшот и брюки, 6 расцветок",
      desc: "Комплект для малышей: свитшот с милой аппликацией и контрастными рукавами и брюки. Тёплый внутри, удобен тем, кто учится ходить.",
      features: ["Свитшот + брюки", "Аппликация на груди", "Тёплый внутри", "Несколько расцветок"] }
  },
  {
    id: "bow-blouse", cat: "sets", photos: 2,
    uz: { name: "Bantli kofta va klesh shim", short: "Qizlar uchun bayramona to'plam",
      desc: "Qizchalar uchun ikki qismli to'plam: katta bant bilan bezatilgan kofta va qora klesh shim. Bayram, mehmondorchilik va maktab tadbirlari uchun.",
      features: ["Kofta + klesh shim", "Katta bant", "Ranglari: pushti, oq, qizil", "Bayramona ko'rinish"] },
    ru: { name: "Блузка с бантом и брюки-клёш", short: "Нарядный комплект для девочек",
      desc: "Комплект для девочек: кофта с большим бантом и чёрные брюки-клёш. Для праздников, гостей и школьных мероприятий.",
      features: ["Кофта + брюки-клёш", "Большой бант", "Цвета: розовый, белый, красный", "Нарядный вид"] }
  },
  {
    id: "girl-quilted-set", cat: "outer", photos: 4,
    uz: { name: "Kurtka-nimcha va keng shim", short: "Qizlar uchun issiq to'plam",
      desc: "Qizlar uchun zamonaviy to'plam: cho'ntaklari ko'p yengil kurtka-nimcha, kapyushonli kofta va keng shim. Kuz va qish uchun issiq va qulay.",
      features: ["Nimcha + kofta + shim", "Ko'p cho'ntakli", "Keng shim", "Ranglari: pushti, kulrang, qora, bordo, binafsha"] },
    ru: { name: "Комплект с курткой-жилетом", short: "Тёплый комплект для девочек",
      desc: "Модный комплект для девочек: лёгкая куртка-жилет с карманами, кофта с капюшоном и широкие брюки. Тёпло и удобно осенью и зимой.",
      features: ["Жилет + кофта + брюки", "Много карманов", "Широкие брюки", "Цвета: розовый, серый, чёрный, бордовый, сиреневый"] }
  },
  {
    id: "fur-hood-tracksuit", cat: "sets", photos: 1,
    uz: { name: "Mo'ynali kapyushonli kostyum", short: "Qizlar uchun sport kostyum",
      desc: "Kapyushoni oq mo'yna bilan bezatilgan issiq sport kostyum: zamokli kofta va to'g'ri shim. Sovuq kunlarda ham qulay.",
      features: ["Kofta + shim", "Kapyushon mo'ynali", "Zamokli", "Ranglari: qora, pushti, bej, bordo"] },
    ru: { name: "Костюм с меховым капюшоном", short: "Спортивный костюм для девочек",
      desc: "Тёплый спортивный костюм: кофта на молнии с капюшоном, отделанным белым мехом, и прямые брюки. Удобно и в холодные дни.",
      features: ["Кофта + брюки", "Капюшон с мехом", "На молнии", "Цвета: чёрный, розовый, бежевый, бордовый"] }
  },
  {
    id: "puffer-vest-trio", cat: "teen", photos: 2,
    uz: { name: "Puxovik-nimcha to'plami", short: "O'smir qizlar uchun",
      desc: "Yengil puxovik-nimcha, kofta va keng shimdan iborat zamonaviy to'plam. Shaharda sayr qilish va maktab uchun.",
      features: ["Nimcha + kofta + shim", "Yengil va issiq", "Zamonaviy fason", "Ranglari: qizil, pushti, krem"] },
    ru: { name: "Комплект с дутым жилетом", short: "Для девочек-подростков",
      desc: "Модный комплект: лёгкий дутый жилет, кофта и широкие брюки. Для прогулок по городу и школы.",
      features: ["Жилет + кофта + брюки", "Лёгкий и тёплый", "Модный крой", "Цвета: красный, розовый, молочный"] }
  },
  {
    id: "boy-sweater", cat: "knit", photos: 3,
    uz: { name: "To'qilgan o'g'il bolalar sviteri", short: "Klassik, issiq",
      desc: "Qalin to'qilgan klassik sviter. Yoqasi, yengi va etagi kontrast rangli. Ko'ylak ustidan yoki yolg'iz kiyish mumkin.",
      features: ["Qalin to'qima", "Kontrast hoshiya", "Maktab uchun mos", "Ranglari: to'q ko'k, kulrang, chiziqli"] },
    ru: { name: "Вязаный свитер для мальчиков", short: "Классический, тёплый",
      desc: "Классический свитер плотной вязки с контрастной отделкой ворота, манжет и низа. Можно носить с рубашкой или отдельно.",
      features: ["Плотная вязка", "Контрастная отделка", "Подходит для школы", "Цвета: тёмно-синий, серый, в полоску"] }
  },
  {
    id: "house-set", cat: "sets", photos: 2, sizes: "80–110",
    uz: { name: "Uycha rasmli to'plam", short: "Svitshot va chiziqli shim",
      desc: "Kichkintoylar uchun issiq to'plam: aplikatsiyali svitshot va chiziqli shim. Mayin mato, kundalik kiyish uchun.",
      features: ["O'lchamlar: 80–110", "Svitshot + shim", "Chiziqli shim", "Ranglari: kulrang, jigarrang, bordo"] },
    ru: { name: "Комплект с домиком", short: "Свитшот и брюки в полоску",
      desc: "Тёплый комплект для малышей: свитшот с аппликацией и брюки в полоску. Мягкая ткань, на каждый день.",
      features: ["Размеры: 80–110", "Свитшот + брюки", "Брюки в полоску", "Цвета: серый, коричневый, бордовый"] }
  },
  {
    id: "teen-puffer", cat: "teen", photos: 3,
    uz: { name: "O'smirlar uchun qishki kurtka", short: "Kapyushonli puxovik",
      desc: "O'smir o'g'il bolalar uchun issiq qishki kurtka. Kapyushonli, ichi yumshoq, katta cho'ntaklari bor. Sovuq qishga mos.",
      features: ["Kapyushonli", "Ichi issiq", "Katta cho'ntaklar", "Ranglari: qora, jigarrang, kulrang, bej"] },
    ru: { name: "Зимняя куртка для подростков", short: "Пуховик с капюшоном",
      desc: "Тёплая зимняя куртка для мальчиков-подростков: капюшон, мягкая подкладка, большие карманы. Для холодной зимы.",
      features: ["С капюшоном", "Тёплая подкладка", "Большие карманы", "Цвета: чёрный, коричневый, серый, бежевый"] }
  },
  {
    id: "boy-winter-jacket", cat: "outer", photos: 3, sizes: "100–130",
    uz: { name: "O'g'il bolalar qishki kurtkasi", short: "Mo'ynali kapyushon",
      desc: "Bolalar uchun issiq qishki kurtka: kapyushoni mo'ynali, ichi qalin. Bog'cha va maktab yoshidagi o'g'il bolalar uchun.",
      features: ["O'lchamlar: 100–130", "Kapyushon mo'ynali", "Qalin ichlik", "Ranglari: qora, sariq, bej"] },
    ru: { name: "Зимняя куртка для мальчиков", short: "Капюшон с мехом",
      desc: "Тёплая зимняя куртка: капюшон с мехом и плотная подкладка. Для мальчиков садикового и школьного возраста.",
      features: ["Размеры: 100–130", "Капюшон с мехом", "Плотная подкладка", "Цвета: чёрный, жёлтый, бежевый"] }
  },
  {
    id: "bear-corduroy-set", cat: "baby", photos: 4,
    uz: { name: "Ayiqchali velvet to'plam", short: "Nimcha, kofta va shim",
      desc: "Chaqaloqlar uchun uch qismli to'plam: quloqchali kapyushonli nimcha, chiziqli kofta va velvet shim. Tizzalarida ayiqcha aplikatsiyasi.",
      features: ["Nimcha + kofta + shim", "Quloqchali kapyushon", "Velvet mato", "Ranglari: pushti, zaytun, shaftoli"] },
    ru: { name: "Вельветовый комплект с мишкой", short: "Жилет, кофта и брюки",
      desc: "Комплект для малышей из трёх вещей: жилет с капюшоном-ушками, кофта в полоску и вельветовые брюки с аппликацией-мишкой на коленях.",
      features: ["Жилет + кофта + брюки", "Капюшон с ушками", "Вельвет", "Цвета: розовый, оливковый, персиковый"] }
  },
  {
    id: "baby-padded-set", cat: "baby", photos: 2,
    uz: { name: "Issiq chaqaloq to'plami", short: "Kurtkacha va shim",
      desc: "Kichkintoylar uchun issiq kurtkacha va shim to'plami. Yumshoq, yengil, sayr uchun qulay.",
      features: ["Kurtkacha + shim", "Yumshoq ichlik", "Sayr uchun", "Pastel ranglar"] },
    ru: { name: "Тёплый комплект для малышей", short: "Курточка и брюки",
      desc: "Тёплый комплект для малышей: курточка и брюки. Мягкий, лёгкий, удобен для прогулок.",
      features: ["Курточка + брюки", "Мягкая подкладка", "Для прогулок", "Пастельные цвета"] }
  },
  {
    id: "girl-puffer-vest", cat: "outer", photos: 2,
    uz: { name: "Qizlar uchun puxovik-nimcha", short: "Kofta va shim bilan",
      desc: "Ko'p cho'ntakli puxovik-nimcha, kapyushonli kofta va keng shimdan iborat to'plam. Sport uslubida, issiq.",
      features: ["Nimcha + kofta + shim", "Ko'p cho'ntakli", "Sport uslubi", "Ranglari: qora, binafsha"] },
    ru: { name: "Дутый жилет для девочек", short: "С кофтой и брюками",
      desc: "Комплект: дутый жилет с карманами, кофта с капюшоном и широкие брюки. Спортивный стиль, тёплый.",
      features: ["Жилет + кофта + брюки", "Много карманов", "Спортивный стиль", "Цвета: чёрный, сиреневый"] }
  },
  {
    id: "pink-3pc-set", cat: "teen", photos: 3, sizes: "2–6 / 8–12 yosh",
    uz: { name: "Pushti uch qismli to'plam", short: "Nimcha, kofta va shim",
      desc: "Yorqin pushti rangli to'plam: oq puxovik-nimcha, kapyushonli kofta va keng shim. Kichik va katta qizlar uchun o'lchamlari bor.",
      features: ["O'lcham: 2–6 yosh va 8–12 yosh", "Nimcha + kofta + shim", "Yorqin pushti rang", "Kuz-qish mavsumi"] },
    ru: { name: "Розовый комплект из трёх вещей", short: "Жилет, кофта и брюки",
      desc: "Яркий розовый комплект: белый дутый жилет, кофта с капюшоном и широкие брюки. Есть размеры для младших и старших девочек.",
      features: ["Возраст: 2–6 лет и 8–12 лет", "Жилет + кофта + брюки", "Ярко-розовый цвет", "Сезон осень-зима"] }
  },
  {
    id: "cargo-pants", cat: "pants", photos: 1, sizes: "6–10 yosh",
    uz: { name: "Bolalar kargo shimi", short: "Cho'ntakli, ichi issiq",
      desc: "O'g'il bolalar uchun yon cho'ntakli kargo shim. Beli rezinkali, pochasi manjetli. Faol bolalar uchun.",
      features: ["Yosh: 6–10", "Yon cho'ntaklar", "Beli rezinkali", "Ranglari: zaytun, kulrang, qora"] },
    ru: { name: "Детские брюки-карго", short: "С карманами, утеплённые",
      desc: "Брюки-карго для мальчиков с боковыми карманами, поясом на резинке и манжетами. Для активных детей.",
      features: ["Возраст: 6–10 лет", "Боковые карманы", "Пояс на резинке", "Цвета: оливковый, серый, чёрный"] }
  },
  {
    id: "varsity-set", cat: "sets", photos: 6,
    uz: { name: "Bomber kurtka va shim to'plami", short: "Kichkintoylar uchun",
      desc: "Sport uslubidagi to'plam: tugmali bomber kurtka (aplikatsiyalar bilan) va issiq shim. Kichkintoylar uchun turli rang va rasmlarda.",
      features: ["Bomber + shim", "Tugmali", "Aplikatsiyalar", "6 xil variant"] },
    ru: { name: "Комплект бомбер и брюки", short: "Для малышей",
      desc: "Комплект в спортивном стиле: бомбер на кнопках с аппликациями и тёплые брюки. Для малышей, разные цвета и рисунки.",
      features: ["Бомбер + брюки", "На кнопках", "Аппликации", "6 вариантов"] }
  },
  {
    id: "fur-vest", cat: "outer", photos: 6,
    uz: { name: "Sun'iy mo'ynali nimcha", short: "Qizlar uchun, yumshoq",
      desc: "Yumshoq sun'iy mo'ynadan qizlar nimchasi, oldi chiroyli ilgakli tugmalar bilan. Kofta yoki ko'ylak ustidan kiyiladi.",
      features: ["Sun'iy mo'yna", "Ilgakli tugmalar", "Yengil va issiq", "Ranglari: oq, jigarrang, bej, binafsha"] },
    ru: { name: "Жилет из искусственного меха", short: "Для девочек, мягкий",
      desc: "Мягкий жилет из искусственного меха с красивыми застёжками-петлями. Носится поверх кофты или платья.",
      features: ["Искусственный мех", "Застёжки-петли", "Лёгкий и тёплый", "Цвета: белый, коричневый, бежевый, сиреневый"] }
  },
  {
    id: "print-set", cat: "sets", photos: 4, sizes: "80–120",
    uz: { name: "Kulgili rasmli to'plam", short: "Svitshot va shim",
      desc: "Ichi issiq svitshot va shim to'plami — o'rdakcha, smaylik va boshqa kulgili rasmlar bilan. Ranglari: kulrang, krem, to'q ko'k.",
      features: ["O'lchamlar: 80–120", "Svitshot + shim", "Ichi issiq", "Turli rasmlar"] },
    ru: { name: "Комплект с весёлым принтом", short: "Свитшот и брюки",
      desc: "Утеплённый комплект: свитшот и брюки с уточкой, смайликом и другими весёлыми рисунками. Цвета: серый, молочный, тёмно-синий.",
      features: ["Размеры: 80–120", "Свитшот + брюки", "Утеплённый", "Разные рисунки"] }
  },
  {
    id: "zip-tracksuit", cat: "sets", photos: 1,
    uz: { name: "Zamokli sport kostyum", short: "O'g'il bolalar uchun",
      desc: "Kapyushonli zamokli kofta va shimdan iborat sport kostyum. Klassik to'q ko'k rang, kundalik kiyish uchun.",
      features: ["Kofta + shim", "Kapyushonli", "Zamokli", "To'q ko'k rang"] },
    ru: { name: "Спортивный костюм на молнии", short: "Для мальчиков",
      desc: "Спортивный костюм: кофта на молнии с капюшоном и брюки. Классический тёмно-синий цвет, на каждый день.",
      features: ["Кофта + брюки", "С капюшоном", "На молнии", "Тёмно-синий"] }
  },
  {
    id: "warm-pants", cat: "pants", photos: 4,
    uz: { name: "Issiq klassik shim", short: "Maktab uchun",
      desc: "To'q rangli klassik bolalar shimi, ichi issiq. Maktab formasi bilan yoki kundalik kiyish uchun.",
      features: ["Ichi issiq", "Klassik fason", "Maktab uchun", "To'q ko'k va qora"] },
    ru: { name: "Утеплённые классические брюки", short: "Для школы",
      desc: "Классические детские брюки тёмного цвета с утеплением. Под школьную форму или на каждый день.",
      features: ["Утеплённые", "Классический крой", "Для школы", "Тёмно-синий и чёрный"] }
  },
  {
    id: "inspired-set", cat: "sets", photos: 3,
    uz: { name: "Svitshot va chiziqli shim", short: "Kichkintoylar uchun",
      desc: "Yozuvli svitshot va chiziqli shimdan iborat qulay to'plam. Yumshoq mato, mustahkam chok, rezinkali bel.",
      features: ["Svitshot + shim", "Yumshoq mato", "Mustahkam chok", "Ranglari: kulrang, krem"] },
    ru: { name: "Свитшот и брюки в полоску", short: "Для малышей",
      desc: "Удобный комплект: свитшот с надписью и брюки в полоску. Мягкая ткань, прочные швы, пояс на резинке.",
      features: ["Свитшот + брюки", "Мягкая ткань", "Прочные швы", "Цвета: серый, молочный"] }
  }
];
