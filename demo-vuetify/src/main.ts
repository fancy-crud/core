import 'vuetify/styles'
import './styles/main.sass'

import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'

import { createVuetify } from 'vuetify'

import fancyConfig from './plugins/fancy-crud'

import App from './App.vue'

const app = createApp(App)

const vuetify = createVuetify({
  
})

app.use(vuetify)

app.use(FancyCrud, fancyConfig)

app.mount('#app')
