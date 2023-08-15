import type { HttpRequestPatch, JSONForm, UpdateRequestOptions } from '../axioma'
import { IHttp, Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'
import type { BaseCommand } from '@/common/bus/axioma'

export class RequestUpdateCommand implements BaseCommand {
  public readonly meta = meta(RequestUpdateHandler)

  public readonly url: string

  constructor(
    url: string,
    lookupValue: string | number,
    public readonly form: JSONForm | FormData,
    public readonly options?: UpdateRequestOptions,
  ) {
    this.url = new Url(url, lookupValue).value
  }
}

export abstract class IRequestUpdateHandler {
  abstract execute(command: RequestUpdateCommand): void
}

class RequestUpdateHandler implements IRequestUpdateHandler {
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

injectable(IRequestUpdateHandler.name, RequestUpdateHandler)
