import { inject } from '@fancy-crud/bus'
import { INotificationStore } from '@packages/core/common/notifications/axioma'
import { getDefaultNotifications } from '@packages/core/config'
import type { TriggerFormNotificationCommand } from '../axioma'
import { FORM_MODE, IFormStore } from '../axioma'

export class TriggerFormNotificationHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private notificationService: INotificationStore = inject(INotificationStore.name),
  ) {}

  execute({ formId, notificationType }: TriggerFormNotificationCommand): void {
    const form = this.formStore.searchById(formId)!
    if (form.settings.disableNotifications)
      return

    const notifications = getDefaultNotifications()

    const notificationAction = form.settings.mode === FORM_MODE.create ? notifications.onCreateRecord : notifications.onUpdateRecord
    const notification = notificationAction[notificationType]

    if (!notification)
      return

    this.notificationService.pushNotification(formId, notification)
  }
}

