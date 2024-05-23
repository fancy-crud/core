import type { Notification } from '@fancy-crud/core'
import { NOTIFICATION_TYPE } from '@fancy-crud/core'
import { Notify } from 'quasar'

export function quasarNotifyPlugin<NotificationType extends Record<string, any> & Partial<Omit<Notification, 'type'>>>(defaults?: NotificationType) {
  const _defaults = defaults || {}
  return {
    handler: (rawNotification?: Notification) => {
      if (!rawNotification)
        return

      const notificationTypes: Record<string, string> = {
        [NOTIFICATION_TYPE.success]: 'positive',
        [NOTIFICATION_TYPE.warning]: 'warning',
        [NOTIFICATION_TYPE.error]: 'negative',
        [NOTIFICATION_TYPE.info]: 'info',
        [NOTIFICATION_TYPE.default]: 'ongoing',
      }

      const notificationType: string = notificationTypes[rawNotification.type || NOTIFICATION_TYPE.default]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type: _type, ...notification } = rawNotification

      Notify.create({
        type: notificationType,
        position: 'top-right',
        ..._defaults,
        ...notification,
      })
    },
  }
}
