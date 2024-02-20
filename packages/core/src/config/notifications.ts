import type { Notification, NotificationState, NotificationType } from '@packages/core/common/notifications/axioma'
import { NOTIFICATION_TYPE } from '@packages/core/common/notifications/axioma'

interface NotificationAction extends Record<string, Partial<Record<NotificationType, Notification>>> {}

const notificationHandler: NotificationState = {
  handler: () => console.error('Notification handler not implemented'),
}

const notifications: NotificationAction = {
  onCreateRecord: {
    [NOTIFICATION_TYPE.success]: {
      type: NOTIFICATION_TYPE.success,
      message: 'Record successfully created',
    },
    [NOTIFICATION_TYPE.error]: {
      type: NOTIFICATION_TYPE.error,
      message: 'Failed to create record',
    },
  },
  onUpdateRecord: {
    [NOTIFICATION_TYPE.success]: {
      type: NOTIFICATION_TYPE.success,
      message: 'Record successfully updated',
    },
    [NOTIFICATION_TYPE.error]: {
      type: NOTIFICATION_TYPE.error,
      message: 'Failed to update record',
    },
  },
}

export function getDefaultNotifications(): NotificationAction {
  return notifications
}

export function setDefaultNotifications(actions: NotificationAction) {
  const actionsEntries = Object.entries(actions)

  actionsEntries.forEach(([action, notification]) => {
    const savedAction = notifications[action]

    if (!savedAction)
      notifications[action] = {}

    Object.assign(notifications[action], notification)
  })
}

export function getDefaultNotificationHandler() {
  return notificationHandler
}

export function setDefaultNotificationHandler(handler: NotificationState) {
  Object.assign(notificationHandler, handler)
}
