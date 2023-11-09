import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './styles/main.sass'

import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'

import { Quasar } from 'quasar'

import fancyConfig from './plugins/fancy-crud'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {})

app.use(FancyCrud, fancyConfig)

app.mount('#app')
