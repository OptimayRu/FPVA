import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import Contacts from './components/Contacts.vue'
import InteractiveChecklist from './components/InteractiveChecklist.vue'
import './custom.css'
import { yandexMetrika } from '@hywax/vitepress-yandex-metrika'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, ctx }) {
    // Регистрируем компоненты
    app.component('Contacts', Contacts)
    app.component('InteractiveChecklist', InteractiveChecklist)

    // Подключаем Яндекс Метрику (только в продакшене)
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      yandexMetrika({ app, ctx }, {
        counter: { id: 109107105 }
      })
    }
  },
  setup() {
    const router = useRouter()

    // Функция подсветки термина по хешу
    const highlightFromHash = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      const target = document.getElementById(hash)
      if (!target || !target.classList.contains('term-card')) return

      // Убираем подсветку с других элементов
      document.querySelectorAll('.term-card.highlight').forEach(el => {
        el.classList.remove('highlight')
      })

      // Добавляем подсветку
      target.classList.add('highlight')
      setTimeout(() => target.classList.remove('highlight'), 2000)

      // Плавная прокрутка с учётом фиксированного хедера (отступ 80px)
      const offset = 80
      const y = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    onMounted(() => {
      // При загрузке страницы (если есть якорь)
      highlightFromHash()

      // Обработка изменения хеша (например, при клике на ссылку внутри страницы)
      window.addEventListener('hashchange', highlightFromHash)

      // Обработка навигации внутри VitePress (клиентский переход)
      router.onAfterRouteChanged = () => {
        // Небольшая задержка для полного рендера DOM после смены маршрута
        setTimeout(highlightFromHash, 100)
      }
    })
  }
}
