import type { HttpService, RetrieveRequestOptions } from '../axioma'
import { Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestRetrieveCommand {
  constructor(
    public readonly url: string,
    public readonly lookupValue: string,
    public readonly options?: RetrieveRequestOptions,
  ) {}
}

export class RequestRetrieveHandler {
  constructor(private http: HttpService = httpService) {}

  execute({ url, lookupValue, options }: RequestRetrieveCommand) {
    if (options?.onInit)
      options.onInit()

    const _url = new Url(url, lookupValue)
    this.http.get(_url.value)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
