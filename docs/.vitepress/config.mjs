import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "ru-RU",
  title: "FPVАвиация",
  description: "Всё, что касается FPV",
  base: "/",

  // Sitemap для SEO
  sitemap: {
    hostname: 'https://fpva.ru',
  },


  // 1. Настройка Favicon
  head: [
    ['link', { rel: 'icon', href: '/fpva-fav.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'FPVАвиация' }], // Может совпадать с глобальным title
    ['meta', { property: 'og:description', content: 'Всё, что касается FPV' }], // Или с description
    ['meta', { property: 'og:image', content: 'https://fpva.ru/fpva-preview2.png' }], // <-- ВАЖНО: обязательно полная ссылка!
    ['meta', { property: 'og:url', content: 'https://fpva.ru' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }], // Рекомендуемый тип для Twitter/X
  ],


  // --- ПЕРЕВОД МЕТОК MARKDOWN (корневой уровень) ---
  markdown: {
    config: (md) => {
      md.use(taskLists) // Плагин для рендеринга чекбоксов
    },
    container: {
      infoLabel: 'Примечание',
      tipLabel: 'Совет',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      detailsLabel: 'Подробнее'
    }
  },

  // 2. Все настройки темы (объединены в один объект)
  themeConfig: {
    // Логотип с поддержкой светлой/тёмной темы
    logo: {
      light: '/fpva-logo2.svg',
      dark: '/fpva-logo2.svg',
      alt: 'FPVA logo'
    },
    // siteTitle: false, // при необходимости раскомментировать

    // --- НАСТРОЙКИ ПОИСКА ---
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск по сайту'
          },
          modal: {
            displayDetails: 'Отображать подробный список',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Ничего не найдено по запросу ',
            footer: {
              selectText: 'выбрать',
              selectKeyAriaLabel: 'Выбрать',
              navigateText: 'перейти',
              navigateUpKeyAriaLabel: 'Переместиться вверх',
              navigateDownKeyAriaLabel: 'Переместиться вниз',
              closeText: 'закрыть',
              closeKeyAriaLabel: 'Закрыть'
            }
          }
        }
      }
    },

    // --- ПЕРЕВОД ИНТЕРФЕЙСА ---
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    outline: {
      label: 'Содержание страницы'
    },
    lastUpdated: {
      text: 'Последнее обновление'
    },
    langMenuLabel: 'Сменить язык',
    returnToTopLabel: 'Вернуться к началу',
    sidebarMenuLabel: 'Меню',
    darkModeSwitchLabel: 'Оформление',
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на темную тему',

    // --- СТРАНИЦА 404 (перевод) ---
    notFound: {
      code: '404',
      title: 'СТРАНИЦА НЕ НАЙДЕНА',
      quote: 'Возможно, вам поможет строка поиска или меню сайта.',
      linkLabel: 'Вернуться на главную',
      linkText: 'Вернуться в начало'
    },

    // --- ПОДВАЛ САЙТА ---
    footer: {
      message: 'Сделано с любовью к плавным полётам.',
      copyright: 'AlmazM © 2026'
    },

    // --- НАВИГАЦИЯ ---
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Чек-листы', link: '/fpv-checklist' },
      { text: 'База знаний', link: '/fpv-history' },
      { text: 'Глоссарий', link: '/fpv-glossary' },
      { text: 'Об этом сайте', link: '/about' },
      { text: 'Контакты', link: '/contact' }
    ],

    sidebar: [
      {
        text: 'База знаний',
        items: [
          { text: 'Чек-листы', link: '/fpv-checklist' },
          { text: 'Об этом сайте', link: '/about' },
          { text: 'История FPV', link: '/fpv-history' },
          { text: 'Направления FPV', link: '/fpv-directions' },
          { text: 'С чего начать', link: '/fpv-starting' },
          { text: 'Необходимое оборудование', link: '/fpv-equipment' },
          { text: 'Симуляторы FPV', link: '/fpv-simulators' },
          { text: 'Полёты в реальности', link: '/fpv-real' },
          { text: 'Анатомия дрона', link: '/drone-anatomy' },
          { text: 'Конфигураторы дронов', link: '/drone-config' },
          { text: 'Законодательство', link: '/fpv-law' },
          { text: 'Соревнования и сообщество', link: '/fpv-community' },
          { text: 'Стоимость хобби', link: '/fpv-costs' },
          { text: 'Особо важное', link: '/fpv-important' },
          { text: 'Глоссарий', link: '/fpv-glossary' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'telegram', link: 'https://t.me/FPVaRu' }
    ]
  }
})
