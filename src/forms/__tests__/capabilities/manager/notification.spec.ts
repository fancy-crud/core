import { NotificationManagerHandler } from '@/forms/capabilities'
import type { Notification, NotificationMap } from '@/forms/axioma'
import { NotificationType } from '@/forms/axioma'

describe('NotificationManagerHandler', () => {
  let notificationManagerHandler: NotificationManagerHandler
  let id: symbol

  beforeEach(() => {
    id = Symbol('id')
    notificationManagerHandler = new NotificationManagerHandler(id)
  })

  it('should push notifications to the correct notification handler', () => {
    const successHandler = vi.fn()
    const warningHandler = vi.fn()

    const notificationHandler1: NotificationMap = {
      [NotificationType.success]: successHandler,
    }

    const notificationHandler2: NotificationMap = {
      [NotificationType.warning]: warningHandler,
    }

    notificationManagerHandler.setNotificationHandler(notificationHandler1)
    notificationManagerHandler.setNotificationHandler(notificationHandler2)

    const notification1: Notification = {
      type: NotificationType.success,
      message: 'Test notification',
    }

    const notification2: Notification = {
      type: NotificationType.warning,
      message: 'Test notification',
    }

    notificationManagerHandler.pushNotification(notification1)
    notificationManagerHandler.pushNotification(notification2)

    expect(notificationHandler1[NotificationType.success]).toHaveBeenCalledTimes(1)
    expect(notificationHandler1[NotificationType.success]).toHaveBeenCalledWith(notification1)

    expect(notificationHandler2[NotificationType.warning]).toHaveBeenCalledTimes(1)
    expect(notificationHandler2[NotificationType.warning]).toHaveBeenCalledWith(notification2)
  })

  it('should not push notifications when there is no matching notification handler', () => {
    const notificationHandler: NotificationMap = {
      [NotificationType.warning]: vi.fn(),
    }
    notificationManagerHandler.setNotificationHandler(notificationHandler)

    const notification: Notification = {
      type: NotificationType.success,
      message: 'Test notification',
    }

    notificationManagerHandler.pushNotification(notification)

    expect(notificationHandler[NotificationType.warning]).not.toHaveBeenCalled()
  })

  it('should remove notification handlers correctly', () => {
    const notificationHandler: NotificationMap = {
      [NotificationType.success]: vi.fn(),
    }
    notificationManagerHandler.setNotificationHandler(notificationHandler)

    const notification: Notification = {
      type: NotificationType.success,
      message: 'Test notification',
    }

    notificationManagerHandler.pushNotification(notification)
    notificationManagerHandler.removeNotificationHandlers()
    notificationManagerHandler.pushNotification(notification)

    expect(notificationHandler[NotificationType.success]).toHaveBeenCalledTimes(1)
    expect(notificationHandler[NotificationType.success]).toHaveBeenCalledWith(notification)
  })
})
