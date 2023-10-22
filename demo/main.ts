import { createApp } from 'vue'
import axios from 'axios'
import { FancyCrud } from '@fancy-crud/vue'
import { processResult } from '@fancy-crud/rules-processors'
import { vueToastifyPlugin } from '@fancy-crud/vue-toastify-plugin'
import Oruga from '@oruga-ui/oruga-next'

import { defaultCustomization, fields, table, utils } from '@fancy-crud/oruga-wrapper'
import App from './App.vue'

import './styles/main.sass'

axios.defaults.baseURL = 'http://localhost:9000/api/'

const app = createApp(App)

app.use(Oruga, {
  modal: {
    contentClass: 'p-5',
  },
})
app.use(FancyCrud, {
  http: {
    request: axios,
  },
  fields,
  utils,
  table,
  defaultClasses: defaultCustomization,
  ruleOptions: {
    processResult,
  },
  notificationHandler: vueToastifyPlugin({ autoClose: 5000 }),
})

app.mount('#app')
