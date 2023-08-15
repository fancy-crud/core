import { TableStore } from '../axioma'
import type { TableStoreState } from '../axioma'
import type { BaseCommand } from '@/common/bus/axioma'

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
