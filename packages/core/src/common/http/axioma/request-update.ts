import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { JSONForm, UpdateRequestOptions } from '../axioma'
import { Url } from '../axioma'

export class RequestUpdateCommand implements BaseCommand {
  public readonly meta = meta(IRequestUpdateHandler)

  public readonly url: string

  constructor(
    url: string,
    lookupValue: string | number,
    public readonly form: JSONForm | FormData,
    public readonly options?: UpdateRequestOptions,
  ) {
    this.url = new Url(url, lookupValue).value
  }
}

export abstract class IRequestUpdateHandler {
  abstract execute(command: RequestUpdateCommand): void
}
