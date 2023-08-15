import { TableStore } from '../axioma'
import type { BaseCommand } from '@/common/bus/axioma'

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
