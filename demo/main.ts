import { createApp } from 'vue'
import type { ZodAny } from 'zod'
import axios from 'axios'
import { FancyCrud } from '@fancy-crud/vue'
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
