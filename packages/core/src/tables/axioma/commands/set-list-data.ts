import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class SetListDataCommand implements BaseCommand {
  public readonly meta = meta(ISetListDataHandler)

  constructor(
    public readonly tableId: symbol,
    public readonly data: any[],
  ) {}
}

export abstract class ISetListDataHandler {
  abstract execute(command: SetListDataCommand): void
}
