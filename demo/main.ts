import { createApp } from 'vue'
import axios from 'axios'
import { FancyCrud } from '@fancy-crud/vue'
import { processResult } from '@fancy-crud/rules-processors'
import Oruga from '@oruga-ui/oruga-next'

import { defaultCustomization, fields, table, utils } from '@fancy-crud/oruga-wrapper'
import App from './App.vue'

import './styles/main.sass'

axios.defaults.baseURL = 'http://localhost:9000/api/'

const app = createApp(App)

app.use(Oruga)
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
})

app.mount('#app')
