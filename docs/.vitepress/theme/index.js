import DefaultTheme from 'vitepress/theme'
import { h, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import Contacts from './components/Contacts.vue'
import InteractiveChecklist from './components/InteractiveChecklist.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import './custom.css'
import { yandexMetrika } from '@hywax/vitepress-yandex-metrika'

import {
  NolebaseEnhancedReadabilitiesMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, ctx }) {
    app.component('Contacts', Contacts)
    app.component('InteractiveChecklist', InteractiveChecklist)

    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      yandexMetrika({ app, ctx }, {
        counter: { id: 109107105 }
      })
    }
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Breadcrumbs),
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
    })
  },
  setup() {
    const router = useRouter()

    const highlightFromHash = () => {
      console.log('[DEBUG] highlightFromHash вызвана')
      const hash = window.location.hash.slice(1)
      console.log('[DEBUG] hash:', hash)
      if (!hash) {
        console.log('[DEBUG] hash пустой, выход')
        return
      }
      const target = document.getElementById(hash)
      console.log('[DEBUG] target найден:', !!target)
      if (target) console.log('[DEBUG] классы target:', target.classList.toString())
      if (!target || !target.classList.contains('term-card')) {
        console.log('[DEBUG] target не подходит (нет term-card)')
        return
      }
      console.log('[DEBUG] начинаем подсветку')
      document.querySelectorAll('.term-card.highlight').forEach(el => {
        el.classList.remove('highlight')
      })
      target.classList.add('highlight')
      console.log('[DEBUG] класс highlight добавлен')
      setTimeout(() => {
        target.classList.remove('highlight')
        console.log('[DEBUG] класс highlight удалён через 2с')
      }, 2000)
      const offset = 80
      const y = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
      console.log('[DEBUG] прокрутка выполнена')
    }

    onMounted(() => {
      highlightFromHash()
      window.addEventListener('hashchange', highlightFromHash)
      router.onAfterRouteChanged = () => {
        setTimeout(highlightFromHash, 500)
      }
    })
  }
}
