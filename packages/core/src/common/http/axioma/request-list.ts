import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { ListRequestOptions } from '../axioma'
import { Url } from '../axioma'

export class RequestListCommand implements BaseCommand {
  public readonly meta = meta(IRequestListHandler)
  public readonly url: string

  constructor(
    url: string,
    public readonly params?: Record<string, unknown>,
    public readonly options?: ListRequestOptions,
  ) {
    this.url = new Url(url).value
  }
}

export abstract class IRequestListHandler {
  abstract execute({ url, params, options }: RequestListCommand): void
}

