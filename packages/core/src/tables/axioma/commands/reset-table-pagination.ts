import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class ResetTablePaginationCommand implements BaseCommand {
  public readonly meta = meta(IResetTablePaginationHandler)

  constructor(
    public readonly tableId: symbol,
  ) {}
}

export abstract class IResetTablePaginationHandler implements BaseHandler {
  abstract execute(command: ResetTablePaginationCommand): void
}
