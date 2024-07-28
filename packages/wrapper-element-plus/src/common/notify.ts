import type { Notification } from '@fancy-crud/core'
import type { NotificationOptions } from 'element-plus'
import { ElNotification } from 'element-plus'

export function notify(defaults?: Partial<NotificationOptions>) {
  const _defaults = defaults || {}
  return {
    handler: (rawNotification?: Notification) => {
      if (!rawNotification)
        return

      ElNotification({
        position: 'top-right',
        ..._defaults,
        ...rawNotification as Partial<NotificationOptions>,
      })
    },
  }
}

export const toast = notify
