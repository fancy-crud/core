import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { NotificationType } from '@packages/core/common/notifications/axioma'

export class TriggerFormNotificationCommand implements BaseCommand {
  public readonly meta = meta(ITriggerFormNotificationHandler)

  constructor(
    public readonly formId: symbol,
    public readonly notificationType: NotificationType,
  ) {}
}

export abstract class ITriggerFormNotificationHandler implements BaseHandler {
  abstract execute(command: TriggerFormNotificationCommand): void
}
