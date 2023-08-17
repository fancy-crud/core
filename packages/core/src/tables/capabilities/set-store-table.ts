import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import { TableStore } from '../axioma'
import type { TableStoreState } from '../axioma'

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
