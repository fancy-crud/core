import type { DeleteRequestOptions, HttpService } from '../axioma'
import { Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestDeleteCommand {
  constructor(
    public readonly url: string,
    public readonly lookupValue: string,
    public readonly options?: DeleteRequestOptions,
  ) {}
}

export class RequestDeleteHandler {
  constructor(private http: HttpService = httpService) {}

  execute({ url, lookupValue, options }: RequestDeleteCommand) {
    if (options?.onInit)
      options.onInit()

    const _url = new Url(url, lookupValue)
    this.http.delete(_url.value)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
