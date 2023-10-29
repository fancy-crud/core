import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

import components, { styles } from '@fancy-crud/wrapper-vuetify'
import { zodSafeParser as parser } from '@fancy-crud/rules-processors'
import { vueToastifyPlugin } from '@fancy-crud/vue-toastify-plugin'

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
  toast: vueToastifyPlugin({ autoClose: 5000 }),
})
