import type { StoreMap } from '@/common/store/axioma'
import type { TableStoreState } from '@/tables/axioma'

export class TableStore {
  public static map: StoreMap<TableStoreState> = new Map()
}
