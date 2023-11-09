import type { BaseCommand } from '@fancy-crud/bus'
import type { StoreMap } from '@packages/core/common/store/axioma/typing'
import { meta } from '@fancy-crud/bus'
import type { TableStoreState } from '../axioma'

export class SetStoreTableManagerCommand implements BaseCommand {
  public readonly meta = meta(ISetStoreTableManagerHandler)

  constructor(
    public readonly manager: StoreMap<TableStoreState>,
  ) {}
}

export abstract class ISetStoreTableManagerHandler {
  abstract execute({ manager }: SetStoreTableManagerCommand): void
}
