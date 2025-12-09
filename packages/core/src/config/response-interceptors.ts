import { IFormStore, SetFieldsErrorsCommand, TriggerFormNotificationCommand } from '@packages/core/forms/axioma'

import { Bus, inject } from '@fancy-crud/bus'
import type { ResponseInterceptorState } from '@packages/core/common/response-interceptor/axioma'
import { NOTIFICATION_TYPE } from '../common/notifications/axioma'

const bus = new Bus()

const interceptors: ResponseInterceptorState = {
  ...genericErrorNotification(400, 451),
  ...genericErrorNotification(500, 511),
  // Network error (no response from server)
  0: (formId: symbol) => {
    bus.execute(
      new TriggerFormNotificationCommand(formId, NOTIFICATION_TYPE.error),
    )
  },
  // Bad request - set field errors AND show notification
  400: (formId: symbol, error: { response?: { data: any } }) => {
    const formStore: IFormStore = inject(IFormStore)
    const form = formStore.searchById(formId)

    if (!form)
      return

    const { fields } = form

    const errors = error.response?.data

    if (errors) {
      bus.execute(
        new SetFieldsErrorsCommand(fields, errors),
      )
    }

    // Also show error notification
    bus.execute(
      new TriggerFormNotificationCommand(formId, NOTIFICATION_TYPE.error),
    )
  },
}

export function genericErrorNotification(start_code: number, end_code: number) {
  const statusCodes: ResponseInterceptorState = {}
  for (let index = start_code; index <= end_code; index++) {
    statusCodes[index] = (formId: symbol) => {
      bus.execute(
        new TriggerFormNotificationCommand(formId, NOTIFICATION_TYPE.error),
      )
    }
  }

  return statusCodes
}

export function getDefaultInterceptors() {
  return interceptors
}

export function setDefaultInterceptors(handlers: ResponseInterceptorState) {
  Object.assign(interceptors, handlers)
}

