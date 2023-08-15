export const NOTIFICATION_TYPE = enumGenerator([
  'success',
  'warning',
  'error',
  'info',
  'default',
])

export type NotificationType = keyof typeof NOTIFICATION_TYPE

export interface Notification {
  type: NotificationType
  message?: string
  payload?: any
}

export interface NotificationState extends Partial<Record<NotificationType, (notification?: Notification) => void>> {}

export abstract class INotificationStore {
  abstract save(id: symbol, payload: NotificationState): void
  abstract searchById(id: symbol): NotificationState | undefined
  abstract deleteById(id: symbol): void
  abstract pushNotification(id: symbol, notification: Notification): void
}
