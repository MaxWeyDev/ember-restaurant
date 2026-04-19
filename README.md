# EMBER — Ресторан высокой кухни

Лендинг вымышленного ресторана премиум-класса. Тёмная атмосферная эстетика, золотые акценты, плавные анимации появления при скролле.

## Стек

Чистый фронтенд без сборки:

- **HTML5** — семантическая разметка
- **CSS3** — кастомные свойства, grid, `IntersectionObserver`-ready анимации
- **Vanilla JS** — табы меню, fade-in на скролле, валидация формы
- **Google Fonts** — Cormorant Garamond + DM Sans

## Структура

```
.
├── index.html        # Hero / About / Menu / Gallery / Quote / Reservation / Footer
├── styles.css        # Dark luxury тема, адаптив, анимации
├── script.js         # Данные меню, табы, reveal-on-scroll, форма
└── assets/           # SVG-иллюстрации (fallback для sandbox-окружений)
    ├── about.svg
    ├── hero-bg.svg
    └── dish-1..4.svg
```

## Запуск

Сайт статический — достаточно открыть `index.html` в браузере или поднять простой сервер:

```bash
# Python
python -m http.server 5173

# Node
npx serve .
```

## Дизайн-система

| Токен | Значение |
|---|---|
| Фон | `#0c0a08` |
| Золото | `#D4AF37` |
| Заголовки | Cormorant Garamond, 300–500 |
| Текст | DM Sans, 300–500 |
| Скругления | 2–4px (архитектурные) |

## Фотографии

Используются URL с Unsplash с локальным SVG-fallback (`onerror`). В production работают оригинальные фото, в offline/sandbox-окружениях подставляются авторские SVG-иллюстрации.
