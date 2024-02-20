import { meta } from '@fancy-crud/bus'
import type { BaseCommand } from '@fancy-crud/bus'
import type { DeleteRequestOptions } from '../axioma'
import { Url } from '../axioma'

export class RequestDeleteCommand implements BaseCommand {
  public readonly meta = meta(IRequestDeleteHandler)
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
