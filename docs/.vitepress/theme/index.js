import DefaultTheme from 'vitepress/theme'
import { h, provide, onMounted } from 'vue'
import { useRouter, useData } from 'vitepress'
import Contacts from './components/Contacts.vue'
import InteractiveChecklist from './components/InteractiveChecklist.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import ParticlesBg from './components/ParticlesBg.vue'
import './custom.css'
import { yandexMetrika } from '@hywax/vitepress-yandex-metrika'

import {
  NolebaseEnhancedReadabilitiesMenu,
  InjectionKey,
  SpotlightStyle,
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
    const { page } = useData()
    const allowedPages = ['index.md', 'contact.md']
    const isHome = allowedPages.includes(page.value.relativePath) || page.value.isNotFound

    return h(DefaultTheme.Layout, null, {
      'layout-top': () => isHome ? h(ParticlesBg) : null,
      'doc-before': () => h(Breadcrumbs),
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
    })
  },
  setup() {
    provide(InjectionKey, {
      spotlight: {
        defaultToggle: true,
        defaultStyle: SpotlightStyle.Aside,
      },
    })

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
              }
              
              .VPFeature {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                will-change: transform;
                transform-style: preserve-3d;
                perspective: 1000px;
              }
              
              .VPFeature:hover {
                box-shadow: 0 5px 15px -5px rgba(0,0,0,0.07);
              }
              
              .VPFeature .glare {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                border-radius: inherit;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 2;
                mix-blend-mode: overlay;
              }
              
              .VPFeature:hover .glare {
                opacity: 1;
              }
              
              html {
                transition: background-color 0.4s ease, color 0.4s ease;
              }
              
              :root {
                transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
              }`
      document.head.appendChild(style)

      function initTiltEffect() {
        const cards = document.querySelectorAll('.VPFeature')
        cards.forEach(card => {
          const glare = document.createElement('div')
          glare.className = 'glare'
          card.style.position = 'relative'
          card.appendChild(glare)

          let isHovering = false

          card.addEventListener('mouseenter', () => { isHovering = true })
          card.addEventListener('mousemove', (e) => {
            if (!isHovering) return
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = ((y - centerY) / centerY) * -6
            const rotateY = ((x - centerX) / centerX) * 6

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

            const isDark = document.documentElement.classList.contains('dark')
            const accentColor = isDark ? '0, 164, 255' : '0, 144, 224'
            const opacity = isDark ? 0.11 : 0.03
            glare.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(${accentColor}, ${opacity}) 0%, rgba(${accentColor}, 0.02) 80%, transparent 100%)`
            glare.style.mixBlendMode = isDark ? 'overlay' : 'multiply'
            glare.style.opacity = '1'
          })
          card.addEventListener('mouseleave', () => {
            isHovering = false
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
            glare.style.opacity = '0'
          })
        })
      }

      initTiltEffect()

      highlightFromHash()
      window.addEventListener('hashchange', highlightFromHash)
      router.onAfterRouteChanged = () => {
        setTimeout(() => {
          highlightFromHash()
          initTiltEffect()
        }, 500)
      }
    })
  }
}
