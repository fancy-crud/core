import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'

import { FancyCrud } from '@fancy-crud/vue'
import fancyConfig from './plugins/fancy-crud'

import 'primeicons/primeicons.css'
import './main.css'

import '@fancy-crud/wrapper-primevue/dist/fancy-crud-wrapper-primevue.css'

import { FwToast } from '@fancy-crud/wrapper-primevue'

const app = createApp(App)

// IMPORTANT: Register PrimeVue and ToastService before FancyCrud
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'dark',
      cssLayer: {
        name: 'primevue',
        order: 'base, theme, primevue'
      }
    }
  }
})
app.use(ToastService)

// Then register FancyCrud (which will use the toast handler and components internally)
app.use(FancyCrud, fancyConfig)

// Only register FwToast as a global component (the rest are used internally by FancyCrud)
app.component('FwToast', FwToast)

app.mount('#app')
