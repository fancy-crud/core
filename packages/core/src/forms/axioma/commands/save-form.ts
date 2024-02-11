import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { CreateRequestOptions, UpdateRequestOptions } from '@packages/core/common/http/axioma'

export class SaveFormCommand implements BaseCommand {
  public readonly meta = meta(ISaveFormHandler)

  constructor(
    public readonly formId: symbol,
    public readonly options: CreateRequestOptions | UpdateRequestOptions = {},
  ) {}
}

export abstract class ISaveFormHandler implements BaseHandler {
  abstract execute(command: SaveFormCommand): void
}
