import type { HttpRequestGet, ListRequestOptions } from '../axioma'
import { IHttp } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'
import type { BaseCommand } from '@/common/bus/axioma'

export class RequestListCommand implements BaseCommand {
  public readonly meta = meta(RequestListHandler)
  public readonly url: string

  constructor(
    url: string,
    public readonly params?: Record<string, unknown>,
    public readonly options?: ListRequestOptions,
  ) {
    this.url = new Url(url).value
  }
}

class RequestListHandler {
  constructor(private http: HttpRequestGet = inject(IHttp)) {}

  execute({ url, params, options }: RequestListCommand): void {
    if (options?.onInit)
      options.onInit()

    this.http.request.get(url, params)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}

