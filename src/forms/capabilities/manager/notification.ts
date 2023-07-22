import type { ManagerMap, Notification, NotificationManager, NotificationMap } from '@/forms/axioma'

export class NotificationManagerHandler implements NotificationManager {
  private static map: ManagerMap<NotificationMap>

  constructor(private id: symbol) {}

  private getNotificationHandlerFromMap(): NotificationMap {
    const handlers = NotificationManagerHandler.map.get(this.id)

    if (!handlers) {
      NotificationManagerHandler.map.set(this.id, {})
      return NotificationManagerHandler.map.get(this.id)!
    }

    return handlers
  }

  static setManagerMap(managerMap: ManagerMap<NotificationMap>) {
    NotificationManagerHandler.map = managerMap
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
    NotificationManagerHandler.map.delete(this.id)
  }
}
