import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'
import type { GetStoreTableCommand, IGetStoreTableHandler, TableStoreState } from '../axioma'
import { TableStore } from '../axioma'

export class GetStoreTableHandler implements IGetStoreTableHandler {
  execute({ id }: GetStoreTableCommand): TableStoreState {
    const form = TableStore.map.get(id)

    if (!form)
      throw new StoreStateDoesNotExist(id)

    return form
  }
}
