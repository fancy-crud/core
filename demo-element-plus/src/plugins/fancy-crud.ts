import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

import components, { styles } from '@fancy-crud/wrapper-element-plus'
import { valibotSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'
import { vueToastifyPlugin } from '@fancy-crud/plugin-vue3-toastify'

import TheMagic from './TheMagic.vue'

axios.defaults.baseURL = 'http://localhost:9000/api/'

export default defineConfig({
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
  components: {
    ...components,
    tableFooter: TheMagic,
  },
  styles,
  rules: {
    parser,
  },
  toast: vueToastifyPlugin({ autoClose: 5000 }),
})

