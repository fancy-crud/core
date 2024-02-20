import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { ListRequestOptions } from '@packages/core/common/http/axioma'

export class FetchListDataCommand implements BaseCommand {
  public readonly meta = meta(IFetchListDataHandler)

  constructor(
    public readonly tableId: symbol,
    public readonly page = 1,
    public readonly options?: ListRequestOptions,
  ) {}
}

export abstract class IFetchListDataHandler implements BaseHandler {
  abstract execute(command: FetchListDataCommand): void
}
