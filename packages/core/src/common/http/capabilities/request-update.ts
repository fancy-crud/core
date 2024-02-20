import { inject } from '@fancy-crud/bus'
import type { HttpRequestPatch, IRequestUpdateHandler, RequestUpdateCommand } from '../axioma'
import { IHttp, onFailed, onFinally, onSuccess } from '../axioma'

export class RequestUpdateHandler implements IRequestUpdateHandler {
  constructor(private http: HttpRequestPatch = inject(IHttp)) {}

  execute({ url, form, options }: RequestUpdateCommand): void {
    if (options?.onInit)
      options.onInit()

    this.http.request.patch(url, form)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
