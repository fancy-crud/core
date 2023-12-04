import { inject } from '@fancy-crud/bus'
import type { IResetTablePaginationHandler, ResetTablePaginationCommand } from '../axioma'
import { ITableStore } from '../axioma'

export class ResetTablePaginationHandler implements IResetTablePaginationHandler {
  constructor(
    private tableStore: ITableStore = inject(ITableStore),
  ) {}

  execute({ tableId }: ResetTablePaginationCommand): void {
    const table = this.tableStore.searchById(tableId)!

    table.pagination.page = 1
  }
}
