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
      const hash = window.location.hash.slice(1)
      if (!hash) return
      const target = document.getElementById(hash)
      if (!target || !target.classList.contains('term-card')) return
      document.querySelectorAll('.term-card.highlight').forEach(el => {
        el.classList.remove('highlight')
      })
      target.classList.add('highlight')
      setTimeout(() => target.classList.remove('highlight'), 2000)
      const offset = 80
      const y = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    onMounted(() => {
      const style = document.createElement('style')
      style.textContent = `.VPNolebaseEnhancedReadabilitiesMenuFlyout .button {
                padding-left: 7px !important;
                padding-right: 0 !important;
              }
              .VPSocialLinks.VPNavBarSocialLinks.social-links {
                margin-right: 0 !important;
              }
              .VPSwitch.VPSwitchAppearance {
                margin-right: 8px !important;
              }
              .VPNavBarMenu.menu {
                margin-right: -4px !important;
              }`
      document.head.appendChild(style)

      highlightFromHash()
      window.addEventListener('hashchange', highlightFromHash)
      router.onAfterRouteChanged = () => {
        setTimeout(highlightFromHash, 500)
      }
    })
  }
}
