import { Bus } from '@fancy-crud/bus'
import { NOTIFICATION_TYPE } from '@packages/core/common/notifications/axioma'
import type { DispatchOnSuccessFormEventCommand, IDispatchOnSuccessFormEventHandler } from '../axioma'
import { TriggerFormNotificationCommand, TriggerFormResponseInterceptorCommand } from '../axioma'

export class DispatchOnSuccessFormEventHandler implements IDispatchOnSuccessFormEventHandler {
  constructor(
    private bus = new Bus(),
  ) {}

  execute({ formId, response }: DispatchOnSuccessFormEventCommand): void {
    this.bus.execute(
      new TriggerFormResponseInterceptorCommand(formId, response),
    )
    this.bus.execute(
      new TriggerFormNotificationCommand(formId, NOTIFICATION_TYPE.success),
    )
  }
}

