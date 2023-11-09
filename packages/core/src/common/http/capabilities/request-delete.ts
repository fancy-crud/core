import { inject } from '@fancy-crud/bus'
import type { HttpRequestDelete, IRequestDeleteHandler, RequestDeleteCommand } from '../axioma'
import { IHttp, onFailed, onFinally, onSuccess } from '../axioma'

export class RequestDeleteHandler implements IRequestDeleteHandler {
  constructor(private http: HttpRequestDelete = inject(IHttp)) {}

  execute({ url, options }: RequestDeleteCommand): void {
    if (options?.onInit)
      options.onInit()

    this.http.request.delete(url)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
