/* ============================================================
   EMBER — Interactive layer
   ============================================================ */

(() => {
  "use strict";

  /* ----------------------------------------------------------
     Menu data
  ---------------------------------------------------------- */
  const MENU = {
    appetizers: [
      {
        name: "Тартар из говядины",
        desc: "Вырезка черного ангуса, копчёный желток, трюфельное масло, бородинские крошки.",
        price: "1 200 ₽",
      },
      {
        name: "Гребешки на углях",
        desc: "Дикие гребешки, крем из пастернака, икра форели, масло из жжёного лука.",
        price: "1 650 ₽",
      },
      {
        name: "Карпаччо из тунца",
        desc: "Тунец акамi, пепел из водорослей, юдзу, микрозелень, оливковое масло холодного отжима.",
        price: "1 450 ₽",
      },
      {
        name: "Фуа-гра на гриле",
        desc: "Утиная печень, карамелизированная груша, бриошь, редукция портвейна.",
        price: "1 850 ₽",
      },
      {
        name: "Устрицы Fine de Claire",
        desc: "Шесть устриц, огуречный гранит, лимон, ржаной хлеб с маслом из морских водорослей.",
        price: "2 100 ₽",
      },
      {
        name: "Севиче из сибаса",
        desc: "Свежий сибас, молоко тигра, красный лук, кинза, батат, кукурузные чипсы.",
        price: "1 350 ₽",
      },
    ],
    mains: [
      {
        name: "Стейк Томагавк",
        desc: "Мраморная говядина 45 дней выдержки, костный мозг, соус борделез, печёный корнеплод.",
        price: "4 900 ₽",
      },
      {
        name: "Утиная грудка",
        desc: "Магрет с вишнёвым соусом, пюре из сельдерея, жареная капуста, сироп из вишни.",
        price: "2 400 ₽",
      },
      {
        name: "Черная треска мисо",
        desc: "72 часа маринада в белом мисо, тушёный дайкон, молодой шпинат, бульон даси.",
        price: "3 200 ₽",
      },
      {
        name: "Ягнёнок с углей",
        desc: "Каре ягнёнка, мятное песто, пюре из печёного чеснока, овощи на открытом огне.",
        price: "3 600 ₽",
      },
      {
        name: "Ризотто с трюфелем",
        desc: "Карнароли, пармезан 36 месяцев, свежий чёрный трюфель, белое вино.",
        price: "2 800 ₽",
      },
      {
        name: "Дикий осётр",
        desc: "Филе осетра с шафрановой корочкой, пюре из зелёного горошка, икра, бёр-блан.",
        price: "3 400 ₽",
      },
    ],
    desserts: [
      {
        name: "Пламенное суфле",
        desc: "Шоколадное суфле с жидким сердцем, фламбе ром, мороженое Бурбон ваниль.",
        price: "890 ₽",
      },
      {
        name: "Тарт Татен",
        desc: "Карамелизированные яблоки, хрустящее песочное тесто, мороженое сливочной карамели.",
        price: "780 ₽",
      },
      {
        name: "Павлова с маракуйей",
        desc: "Хрустящая меренга, крем из маракуйи, свежие ягоды, мятное масло.",
        price: "720 ₽",
      },
      {
        name: "Шоколадная сфера",
        desc: "Тёмный шоколад Valrhona, горячий карамельный соус у стола, солёная карамель, орехи.",
        price: "950 ₽",
      },
      {
        name: "Крем-брюле с лавандой",
        desc: "Классический крем-брюле, настой прованской лаванды, мед с пасеки, бискотти.",
        price: "680 ₽",
      },
      {
        name: "Сырная тарелка",
        desc: "Пять видов европейских сыров, инжирный конфитюр, грецкие орехи, медовые соты.",
        price: "1 200 ₽",
      },
    ],
  };

  /* ----------------------------------------------------------
     Menu rendering + tabs
  ---------------------------------------------------------- */
  const menuGrid = document.getElementById("menu-grid");
  const tabs = document.querySelectorAll(".menu__tab");

  function renderMenu(category) {
    const dishes = MENU[category] || [];
    menuGrid.innerHTML = dishes
      .map(
        (d) => `
        <article class="dish">
          <div class="dish__header">
            <h3 class="dish__name">${d.name}</h3>
            <span class="dish__price">${d.price}</span>
          </div>
          <p class="dish__desc">${d.desc}</p>
        </article>
      `
      )
      .join("");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderMenu(tab.dataset.tab);
    });
  });

  renderMenu("appetizers");

  /* ----------------------------------------------------------
     Navbar — scrolled state
  ---------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 50) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     Reveal on scroll (IntersectionObserver)
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  revealEls.forEach((el) => {
    const delay = el.dataset.delay;
    if (delay) el.style.setProperty("--delay", `${delay}ms`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealEls.forEach((el) => io.observe(el));

  /* ----------------------------------------------------------
     Reservation form — date min + submit handler
  ---------------------------------------------------------- */
  const form = document.getElementById("reservation-form");
  const status = document.getElementById("form-status");
  const dateInput = form.querySelector('input[name="date"]');

  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  dateInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Пожалуйста, заполните все поля.";
      status.style.color = "#e57373";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправляем…";

    setTimeout(() => {
      status.style.color = "var(--gold)";
      status.textContent = `Спасибо, ${data.name}! Мы перезвоним для подтверждения.`;
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Забронировать";
    }, 900);
  });

  /* ----------------------------------------------------------
     Smooth scroll for in-page links (fallback for older browsers)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
