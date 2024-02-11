import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { RetrieveRequestOptions } from '@packages/core/common/http/axioma'

export class LoadRemoteRecordCommand implements BaseCommand {
  public readonly meta = meta(ILoadRemoteRecordHandler)

  constructor(
    public readonly formId: symbol,
    public readonly lookupValue: string | number,
    public readonly options: RetrieveRequestOptions = {},
  ) {}
}

export abstract class ILoadRemoteRecordHandler implements BaseHandler {
  abstract execute(command: LoadRemoteRecordCommand): void
}
