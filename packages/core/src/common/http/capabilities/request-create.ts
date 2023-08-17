import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { inject, injectable, meta } from '@packages/core/common/bus/capabilities'
import { IHttp, Url } from '../axioma'
import type { CreateRequestOptions, HttpRequestPost, JSONForm } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestCreateCommand implements BaseCommand {
  public readonly meta = meta(RequestCreateHandler)
  public readonly url: string

  constructor(
    url: string,
    public readonly form: JSONForm | FormData,
    public readonly options?: CreateRequestOptions,
  ) {
    this.url = new Url(url).value
  }
}

export abstract class IRequestCreateHandler {
  abstract execute(command: RequestCreateCommand): void
}

class RequestCreateHandler implements IRequestCreateHandler {
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

injectable(IRequestCreateHandler.name, RequestCreateHandler)
