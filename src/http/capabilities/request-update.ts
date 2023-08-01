import type { HttpService, JSONForm, UpdateRequestOptions } from '../axioma'
import { Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestUpdateCommand {
  constructor(
    public readonly url: string,
    public readonly lookupValue: string | number,
    public readonly form: JSONForm | FormData,
    public readonly options?: UpdateRequestOptions,
  ) {}
}

export class RequestUpdateHandler {
  constructor(private http: HttpService = httpService) {}

  execute({ url, lookupValue, form, options }: RequestUpdateCommand) {
    if (options?.onInit)
      options.onInit()

    const _url = new Url(url, lookupValue)
    this.http.patch(_url.value, form)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
