import { createApp } from 'vue'
import type { ZodAny } from 'zod'
import axios from 'axios'
// import '@oruga-ui/oruga-next/dist/oruga-full.css'
import Oruga from '@oruga-ui/oruga-next'
import FancyCrud from '../src/index'
import { defaultClasses, fields, orugaFlowbite, table, utils } from '../src/wrappers'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css'
import './styles/main.sass'

axios.defaults.baseURL = 'http://localhost:9000/api/'

const app = createApp(App)

app.use(Oruga, orugaFlowbite)
app.use(FancyCrud, {
  http: {
    service: axios,
  },
  fields,
  utils,
  table,
  defaultClasses,
  ruleOptions: {
    processResult: (raw: { value: unknown; rule: ZodAny }) => {
      const { value, rule } = raw
      const result = rule.safeParse(value)

      if (result.success)
        return result.success

      return result.error.issues[0].message
    },
  },
})

app.mount('#app')
