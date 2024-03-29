import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'

import Oruga from '@oruga-ui/oruga-next'

import fancyOrugaConfig from './plugins/fancy-crud-oruga'

import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css'
import '@oruga-ui/theme-oruga/dist/oruga-full.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'

// import './styles/main.sass'

const app = createApp(App)

app.use(Oruga, {
  modal: {
    contentClass: 'p-4',
  },
})

app.use(FancyCrud, fancyOrugaConfig)

app.mount('#app')
