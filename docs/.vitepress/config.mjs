import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'

// Кастомный рендерер для изображений с lazy loading
const imageRender = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const srcIndex = token.attrIndex('src')
  const altIndex = token.attrIndex('alt')
  
  const src = srcIndex >= 0 ? token.attrs[srcIndex][1] : ''
  const alt = altIndex >= 0 ? token.attrs[altIndex][1] : ''
  
  // Добавляем loading="lazy" ко всем изображениям, кроме SVG (они часто маленькие)
  const isSvg = src.toLowerCase().endsWith('.svg')
  const loadingAttr = isSvg ? '' : ' loading="lazy"'
  
  // Сохраняем остальные атрибуты (если есть)
  const otherAttrs = token.attrs
    ? token.attrs
        .filter((_, i) => i !== srcIndex && i !== altIndex)
        .map(([key, val]) => ` ${key}="${val}"`)
        .join('')
    : ''

  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  return `<img src="${webpSrc}" alt="${alt}"${loadingAttr}${otherAttrs}>`
}

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
      ],
    },
  },

  build: {
    rollupOptions: {
      external: [/\/\.webp$/],
    },
  },

  lang: 'ru-RU',
  title: 'FPVАвиация',
  description: 'Всё, что касается FPV',
  base: '/',

  sitemap: {
    hostname: 'https://fpva.ru',
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/fpva-fav.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon-180.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'preload', href: '/fpva-logo2.svg', as: 'image' }],
    ['link', { rel: 'preconnect', href: 'https://mc.yandex.ru' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'FPVАвиация' }],
    ['meta', { property: 'og:description', content: 'Всё, что касается FPV' }],
    ['meta', { property: 'og:image', content: 'https://fpva.ru/fpva-preview3.png' }],
    ['meta', { property: 'og:url', content: 'https://fpva.ru' }],
    
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  markdown: {
    config: (md) => {
      md.use(taskLists)
      // Переопределяем рендерер изображений для lazy loading
      md.renderer.rules.image = imageRender
    },
    container: {
      infoLabel: 'Примечание',
      tipLabel: 'Совет',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      detailsLabel: 'Подробнее'
    }
  },

  themeConfig: {
    logo: {
      light: '/fpva-logo2.svg',
      dark: '/fpva-logo2.svg',
      alt: 'FPVA logo'
    },

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

    docFooter: {
      prev: 'Предыдущая',
      next: 'Следующая'
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

    notFound: {
      code: '404',
      title: 'СТРАНИЦА НЕ НАЙДЕНА',
      quote: 'Возможно, вам поможет строка поиска или меню сайта.',
      linkLabel: 'Вернуться на главную',
      linkText: 'Вернуться в начало'
    },

    footer: {
      message: 'Сделано с любовью к плавным полётам.',
      copyright: 'AlmazM © 2026'
    },

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Чек-листы', link: '/fpv-checklist' },
      { text: 'База знаний', link: '/fpv-history' },
      { text: 'Словарь', link: '/fpv-glossary' },
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
          { text: 'Словарь терминов', link: '/fpv-glossary' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'telegram', link: 'https://t.me/FPVaRu' }
    ]
  }
})
