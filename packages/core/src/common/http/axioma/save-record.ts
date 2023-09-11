import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { CreateRequestOptions, UpdateRequestOptions } from '@packages/core/common/http/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class SaveRecordCommand implements BaseCommand {
  public readonly meta = meta(ISaveRecordHandler)

  constructor(
    public readonly url: string,
    public readonly data: Record<string, any> | FormData,
    public readonly mode: 'create' | 'update',
    public readonly lookupValue?: string,
    public readonly options?: CreateRequestOptions | UpdateRequestOptions,
  ) {}
}

export abstract class ISaveRecordHandler {
  abstract execute({ url, options, mode, lookupValue, data }: SaveRecordCommand): void
}
