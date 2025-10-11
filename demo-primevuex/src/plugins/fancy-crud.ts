import { defineConfig } from '@fancy-crud/vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'

import { components, notify, styles } from '@fancy-crud/wrapper-primevue'
import { valibotSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'

axios.defaults.baseURL = 'http://localhost:9000/api/'

// Initialize toast
// const toast = useToast()
// const notifyInstance = notify()
// notifyInstance.setToastInstance(toast)

export default defineConfig({
  components,
  styles,
  // toast: notifyInstance,
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


