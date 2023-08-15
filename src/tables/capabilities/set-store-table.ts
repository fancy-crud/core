import { TableStore } from '../axioma'
import type { TableStoreState } from '../axioma'
import type { BaseCommand } from '@/common/bus/axioma'

export class SetStoreTableCommand implements BaseCommand {
  public readonly meta = meta(SetStoreTableHandler)

  constructor(
    public readonly id: symbol,
    public readonly state: TableStoreState,
  ) {}
}

class SetStoreTableHandler {
  execute({ id, state }: SetStoreTableCommand): void {
    TableStore.map.set(id, state)
  }
}
