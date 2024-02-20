import { inject } from '@fancy-crud/bus'
import { IResponseInterceptorStore } from '@packages/core/common/response-interceptor/axioma'
import type { TriggerFormResponseInterceptorCommand } from '../axioma'
import { IFormStore } from '../axioma'

export class TriggerFormResponseInterceptorHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private responseInterceptorStore: IResponseInterceptorStore = inject(IResponseInterceptorStore.name),
  ) {}

  execute({ formId, response, isError }: TriggerFormResponseInterceptorCommand): void {
    const form = this.formStore.searchById(formId)!

    if (form.settings.disableResponseHandlers || !response)
      return

    const interceptorId = formId

    const responseOrError = isError ? response : response.response
    const statusCode = response.response?.status || 0
    this.responseInterceptorStore.intercept(interceptorId, formId, statusCode, responseOrError)
  }
}

