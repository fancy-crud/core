import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class SetListDataCommand implements BaseCommand {
  public readonly meta = meta(ISetListDataHandler)

  constructor(
    public readonly tableId: symbol,
    public readonly data: any[],
  ) {}
}

export abstract class ISetListDataHandler implements BaseHandler {
  abstract execute(command: SetListDataCommand): void
}
