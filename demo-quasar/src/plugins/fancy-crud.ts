import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

import { components, styles, toast } from '@fancy-crud/wrapper-quasar'
import { zodSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'

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
  toast: toast(),
})
