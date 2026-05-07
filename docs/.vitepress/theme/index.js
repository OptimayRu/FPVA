import DefaultTheme from 'vitepress/theme'
import Contacts from './components/Contacts.vue'
import './custom.css'
import { yandexMetrika } from '@hywax/vitepress-yandex-metrika'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, ctx }) {
    // Регистрируем компонент Contacts
    app.component('Contacts', Contacts)
    
    // Подключаем Яндекс Метрику (только в продакшене)
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      yandexMetrika({ app, ctx }, {
        counter: {
          id: 109107105,
        },
      })
    }
  },
}
