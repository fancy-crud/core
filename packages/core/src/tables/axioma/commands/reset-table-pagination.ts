import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class ResetTablePaginationCommand implements BaseCommand {
  public readonly meta = meta(IResetTablePaginationHandler)

  constructor(
    public readonly tableId: symbol,
  ) {}
}

export abstract class IResetTablePaginationHandler {
  abstract execute(command: ResetTablePaginationCommand): void
}
