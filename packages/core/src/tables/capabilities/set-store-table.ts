import type { ISetStoreTableHandler, SetStoreTableCommand } from '../axioma'
import { TableStore } from '../axioma'

export class SetStoreTableHandler implements ISetStoreTableHandler {
  execute({ id, state }: SetStoreTableCommand): void {
    TableStore.map.set(id, state)
  }
}
