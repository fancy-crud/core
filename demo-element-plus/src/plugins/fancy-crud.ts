import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

import components, { styles } from '@fancy-crud/wrapper-element-plus'
import { valibotSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'
import { vueToastifyPlugin } from '@fancy-crud/plugin-vue3-toastify'

axios.defaults.baseURL = 'http://localhost:9000/api/'

export default defineConfig({
  http: {
    request: axios as any,
    // hooks: {
    // onRetrieve: (response) => {
    //   console.log('🚀 ~ file: fancy-crud.ts:15 ~ response:', response)

    //   return response.data
    // },
    // },
  },
  components,
  styles,
  rules: {
    parser,
  },
  toast: vueToastifyPlugin({ autoClose: 5000 }),
})

