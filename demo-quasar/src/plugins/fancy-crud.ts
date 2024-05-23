import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

import components, { quasarNotifyPlugin, styles } from '@fancy-crud/wrapper-quasar'
import { valibotSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'
import { } from '@packages/wrapper-quasar/common'

axios.defaults.baseURL = 'http://localhost:9000/api/'

export default defineConfig({
  http: {
    request: axios as any,
  },
  components,
  styles,
  // defaultClasses: defaultCustomization,
  rules: {
    parser,
  },
  toast: quasarNotifyPlugin({}),
})
