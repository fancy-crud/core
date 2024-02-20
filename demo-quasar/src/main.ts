import '@quasar/extras/material-icons/material-icons.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'

import 'quasar/dist/quasar.css'
import './styles/main.sass'

import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'

import { Quasar } from 'quasar'
// import quasarIconSet from 'quasar/icon-set/material-icons'
import fancyConfig from './plugins/fancy-crud'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  // iconSet: quasarIconSet,
})

app.use(FancyCrud, fancyConfig)

app.mount('#app')
