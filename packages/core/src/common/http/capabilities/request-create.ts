import { inject } from '@fancy-crud/bus'
import type { HttpRequestPost, IRequestCreateHandler, RequestCreateCommand } from '../axioma'
import { IHttp, onFailed, onFinally, onSuccess } from '../axioma'

export class RequestCreateHandler implements IRequestCreateHandler {
  constructor(private http: HttpRequestPost = inject(IHttp)) {}

  execute({ url, form, options }: RequestCreateCommand): void {
    if (options?.onInit)
      options.onInit()

    this.http.request.post(url, form)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}

