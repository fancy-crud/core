import { meta } from '@fancy-crud/bus'
import type { BaseCommand } from '@fancy-crud/bus'
import type { CreateRequestOptions, UpdateRequestOptions } from '@packages/core/common/http/axioma'

export class SaveFormCommand implements BaseCommand {
  public readonly meta = meta(ISaveFormHandler)

  constructor(
    public readonly formId: symbol,
    public readonly options: CreateRequestOptions | UpdateRequestOptions = {},
  ) {}
}

export abstract class ISaveFormHandler {
  abstract execute(command: SaveFormCommand): void
}
