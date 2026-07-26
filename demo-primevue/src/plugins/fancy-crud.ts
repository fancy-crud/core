import { defineConfig } from '@fancy-crud/vue'
import { components, toast, styles } from '@fancy-crud/wrapper-primevue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9000/api/'

export default defineConfig({
  components,
  styles,
  // Pass the toast handler for notifications
  toast,
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
})
