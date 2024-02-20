import type { ToastOptions } from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface Notification {
  type: any
  message?: string
  payload?: any
}

export function vueToastifyPlugin(options: ToastOptions = {}) {
  return {
    handler: (notification?: Notification) => {
      toast(notification?.message || '', {
        autoClose: 1000,
        ...notification,
        ...options,
      })
    },
  }
}
