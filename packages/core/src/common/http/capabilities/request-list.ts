import { inject } from '@packages/core/common/bus/capabilities'
import type { HttpRequestGet, IRequestListHandler, RequestListCommand } from '../axioma'
import { IHttp, onFailed, onFinally, onSuccess } from '../axioma'

export class RequestListHandler implements IRequestListHandler {
  constructor(private http: HttpRequestGet = inject(IHttp)) {}

  execute({ url, params, options }: RequestListCommand): void {
    if (options?.onInit)
      options.onInit()

    this.http.request.get(url, { params })
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
