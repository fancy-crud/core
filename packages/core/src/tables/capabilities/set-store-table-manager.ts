import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { StoreMap } from '@packages/core/common/store/axioma/typing'
import { meta } from '@packages/core/common/bus/capabilities'
import type { TableStoreState } from '../axioma'
import { TableStore } from '../axioma'

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
