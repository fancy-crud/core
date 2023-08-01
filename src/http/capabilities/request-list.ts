import type { HttpService, ListRequestOptions } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestListCommand {
  constructor(
    public readonly url: string,
    public readonly params?: Record<string, unknown>,
    public readonly options?: ListRequestOptions,
  ) {}
}

export class RequestListHandler {
  constructor(private http: HttpService = httpService) {}

  execute({ url, params, options }: RequestListCommand) {
    if (options?.onInit)
      options.onInit()

    this.http.get(url, params)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}

