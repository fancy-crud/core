import { injectable } from '@fancy-crud/bus'
import { getDefaultNotificationHandler } from '@packages/core/config'
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

    if (!state.handler) {
      console.error('Unable to push notification. Notification handler does not exist')
      return
    }

    state.handler(notification)
  }

  push(args: { id?: symbol; notification: Notification }) {
    const { id, notification } = args

    if (id) {
      this.pushNotification(id, notification)
      return
    }

    const manager = getDefaultNotificationHandler()

    if (!manager.handler)
      return

    manager.handler(notification)
  }
}

injectable(INotificationStore.name, NotificationStoreService)
