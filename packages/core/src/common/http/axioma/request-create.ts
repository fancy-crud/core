import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import { Url } from '../axioma'
import type { CreateRequestOptions, JSONForm } from '../axioma'

export class RequestCreateCommand implements BaseCommand {
  public readonly meta = meta(IRequestCreateHandler)
  public readonly url: string

  constructor(
    url: string,
    public readonly form: JSONForm | FormData,
    public readonly options?: CreateRequestOptions,
  ) {
    this.url = new Url(url).value
  }
}

export abstract class IRequestCreateHandler {
  abstract execute(command: RequestCreateCommand): void
}
