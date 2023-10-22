import type { ToastOptions } from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface Notification {
  message?: string
  payload?: any
  [extraKeys: string]: unknown
}

export function vueToastifyPlugin(options: ToastOptions = {}) {
  return {
    handler: (notification: Notification) => {
      toast(notification.message || '', {
        autoClose: 1000,
        ...notification,
        ...options,
      })
    },
  }
}
