import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { RetrieveRequestOptions } from '../axioma'
import { Url } from '../axioma'

export class RequestRetrieveCommand implements BaseCommand {
  public readonly meta = meta(IRequestRetrieveHandler)
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
