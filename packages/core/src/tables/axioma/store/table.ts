import type { StoreMap } from '@packages/core/common/store/axioma'
import type { TableStoreState } from '@packages/core/tables/axioma'

export class TableStore {
  public static map: StoreMap<TableStoreState> = new Map()
}
