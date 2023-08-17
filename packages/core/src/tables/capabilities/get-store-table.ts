import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'
import { TableStore } from '../axioma'
import type { TableStoreState } from '../axioma'

export class GetStoreTableCommand implements BaseCommand {
  public readonly meta = meta(GetStoreTableHandler)

  constructor(
    public readonly id: symbol,
  ) {}
}

class GetStoreTableHandler {
  execute({ id }: GetStoreTableCommand): TableStoreState {
    const form = TableStore.map.get(id)

    if (!form)
      throw new StoreStateDoesNotExist(id)

    return form
  }
}
