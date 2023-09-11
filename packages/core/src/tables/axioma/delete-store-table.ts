import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class DeleteStoreTableCommand implements BaseCommand {
  public readonly meta = meta(IDeleteStoreTableHandler)

  constructor(
    public readonly id: symbol,
  ) {}
}

export abstract class IDeleteStoreTableHandler {
  abstract execute({ id }: DeleteStoreTableCommand): void
}
