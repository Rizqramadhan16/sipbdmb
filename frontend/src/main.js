import { createApp }     from 'vue'
import { createPinia }   from 'pinia'
import App               from './App.vue'
import router            from './router/index'

// Vuetify — harus sebelum CSS kita
import { createVuetify } from 'vuetify'
import * as components   from 'vuetify/components'
import * as directives   from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// CSS kita — harus SETELAH vuetify
import './assets/styles/main.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary:    '#1565C0',
          secondary:  '#42A5F5',
          success:    '#2E7D32',
          warning:    '#F57F17',
          error:      '#C62828',
          info:       '#0277BD',
          background: '#F0F4F8',
          surface:    '#FFFFFF',
        },
      },
    },
  },
  defaults: {
    VCard:      { rounded: 'lg', elevation: 0, border: true },
    VBtn:       { rounded: 'lg' },
    VTextField: { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VSelect:    { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VTextarea:  { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VDataTable: { hover: true },
  },
  icons: { defaultSet: 'mdi' },
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')