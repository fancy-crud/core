import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import { TableStore } from '../axioma'

export class DeleteStoreTableCommand implements BaseCommand {
  public readonly meta = meta(DeleteStoreTableHandler)

  constructor(
    public readonly id: symbol,
  ) {}
}

class DeleteStoreTableHandler {
  execute({ id }: DeleteStoreTableCommand): void {
    TableStore.map.delete(id)
  }
}
