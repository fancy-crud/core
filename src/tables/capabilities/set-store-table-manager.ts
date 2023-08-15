import type { TableStoreState } from '../axioma'
import { TableStore } from '../axioma'
import type { BaseCommand } from '@/common/bus/axioma'
import type { StoreMap } from '@/common/store/axioma/typing'

export class SetStoreTableManagerCommand implements BaseCommand {
  public readonly meta = meta(SetStoreTableManagerHandler)

  constructor(
    public readonly manager: StoreMap<TableStoreState>,
  ) {}
}

class SetStoreTableManagerHandler {
  execute({ manager }: SetStoreTableManagerCommand): void {
    TableStore.map = manager
  }
}
