import type { ISetStoreTableManagerHandler, SetStoreTableManagerCommand } from '../axioma'
import { TableStore } from '../axioma'

export class SetStoreTableManagerHandler implements ISetStoreTableManagerHandler {
  execute({ manager }: SetStoreTableManagerCommand): void {
    TableStore.map = manager
  }
}
