import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

import { components, styles, toast } from '@fancy-crud/wrapper-element-plus'
import { valibotSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'

axios.defaults.baseURL = 'http://localhost:9000/api/'

export default defineConfig({
  components,
  styles,
  toast: toast(),
  http: {
    request: axios as any,
    hooks: {
      onRetrieveSuccess(response) {
        return {
          ...response,
          data: response.data,
        }
      },
    },
  },
  rules: {
    parser,
  },
})

