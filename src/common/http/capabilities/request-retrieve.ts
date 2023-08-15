import type { HttpRequestGet, RetrieveRequestOptions } from '../axioma'
import { IHttp, Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'
import type { BaseCommand } from '@/common/bus/axioma'

export class RequestRetrieveCommand implements BaseCommand {
  public readonly meta = meta(RequestRetrieveHandler)
  public readonly url: string

  constructor(
    url: string,
    lookupValue: string,
    public readonly options?: RetrieveRequestOptions,
  ) {
    this.url = new Url(url, lookupValue).value
  }
}

export abstract class IRequestRetrieveHandler {
  abstract execute(command: RequestRetrieveCommand): void
}

class RequestRetrieveHandler implements IRequestRetrieveHandler {
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

injectable(IRequestRetrieveHandler.name, RequestRetrieveHandler)
