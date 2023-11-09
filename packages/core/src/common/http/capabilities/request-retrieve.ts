import { inject } from '@fancy-crud/bus'
import type { HttpRequestGet, IRequestRetrieveHandler, RequestRetrieveCommand } from '../axioma'
import { IHttp, onFailed, onFinally, onSuccess } from '../axioma'

export class RequestRetrieveHandler implements IRequestRetrieveHandler {
  constructor(private http: HttpRequestGet = inject(IHttp)) {}

  execute({ url, options }: RequestRetrieveCommand): void {
    if (options?.onInit)
      options.onInit()

    this.http.request.get(url)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
