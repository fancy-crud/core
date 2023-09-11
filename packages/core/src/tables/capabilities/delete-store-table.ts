import type { DeleteStoreTableCommand, IDeleteStoreTableHandler } from '../axioma'
import { TableStore } from '../axioma'

export class DeleteStoreTableHandler implements IDeleteStoreTableHandler {
  execute({ id }: DeleteStoreTableCommand): void {
    TableStore.map.delete(id)
  }
}
