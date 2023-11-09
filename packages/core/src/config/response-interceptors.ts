import { IFormStore, SetFieldsErrorsCommand } from '@packages/core/forms/axioma'

import { Bus, inject } from '@fancy-crud/bus'
import type { ResponseInterceptorState } from '@packages/core/common/response-interceptor/axioma'

const bus = new Bus()

const interceptors: ResponseInterceptorState = {
  400: (formId: symbol, error: { response?: { data: any } }) => {
    const formStore: IFormStore = inject(IFormStore)
    const form = formStore.searchById(formId)

    if (!form)
      return

    const { fields } = form

    const errors = error.response?.data

    if (!errors)
      return

    bus.execute(
      new SetFieldsErrorsCommand(fields, errors),
    )
  },
}

export function getDefaultInterceptors() {
  return interceptors
}

export function setDefaultInterceptors(handlers: ResponseInterceptorState) {
  Object.assign(interceptors, handlers)
}
