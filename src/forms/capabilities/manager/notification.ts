import type { Notification, NotificationManager, NotificationMap } from '@/forms/axioma'

const notificationHandlers = new Map<symbol, NotificationMap>()

export class NotificationManagerHandler implements NotificationManager {
  constructor(private id: symbol) {}

  private getNotificationHandlerFromMap(): NotificationMap {
    const handlers = notificationHandlers.get(this.id)

    if (!handlers) {
      notificationHandlers.set(this.id, {})
      return notificationHandlers.get(this.id)!
    }

    return handlers
  }

  setNotificationHandler(handler: NotificationMap) {
    Object.assign(this.getNotificationHandlerFromMap(), handler)
  }

  pushNotification(notification: Notification) {
    const handler = this.getNotificationHandlerFromMap()[notification.type]

    if (!handler)
      return

    handler(notification)
  }

  removeNotificationHandlers() {
    notificationHandlers.delete(this.id)
  }
}
