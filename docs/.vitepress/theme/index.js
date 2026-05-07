import DefaultTheme from 'vitepress/theme'
import Contacts from './components/Contacts.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Contacts', Contacts)
  }
}
