import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import Aura from '@primeuix/themes/aura';


// PrimeVue CSS imports - must be before main.css

import fancyConfig from './plugins/fancy-crud'

import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import './styles/main.css'

import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
        darkModeSelector: 'dark',
    }
  },
})
app.use(ToastService)

app.use(FancyCrud, fancyConfig)

app.mount('#app')


