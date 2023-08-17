import { injectable } from '@packages/core/common/bus/capabilities'
import type { Notification, NotificationState } from '../axioma'
import { INotificationStore, notificationStore } from '../axioma'

export class NotificationStoreService implements INotificationStore {
  save(id: symbol, payload: NotificationState): void {
    const state = this.searchById(id) || {}

    Object.assign(state, payload)

    notificationStore.set(id, state)
  }

  searchById(id: symbol): NotificationState | undefined {
    return notificationStore.get(id)
  }

  deleteById(id: symbol): void {
    notificationStore.delete(id)
  }

  pushNotification(id: symbol, notification: Notification): void {
    const state = this.searchById(id)

    if (!state) {
      console.error('Unable to push notification. Notification state does not exist')
      return
    }

    const handler = state[notification.type]

    if (!handler) {
      console.error('Unable to push notification. Notification handler does not exist')
      return
    }

    handler(notification)
  }
}

injectable(INotificationStore.name, NotificationStoreService)
