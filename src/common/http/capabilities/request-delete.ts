import type { DeleteRequestOptions, HttpRequestDelete } from '../axioma'
import { IHttp, Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'
import type { BaseCommand } from '@/common/bus/axioma'

export class RequestDeleteCommand implements BaseCommand {
  public readonly meta = meta(RequestDeleteHandler)
  public readonly url: string

  constructor(
    url: string,
    lookupValue: string,
    public readonly options?: DeleteRequestOptions,
  ) {
    this.url = new Url(url, lookupValue).value
  }
}

export abstract class IRequestDeleteHandler {
  abstract execute(command: RequestDeleteCommand): void
}

class RequestDeleteHandler implements IRequestDeleteHandler {
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

injectable(IRequestDeleteHandler.name, RequestDeleteHandler)
