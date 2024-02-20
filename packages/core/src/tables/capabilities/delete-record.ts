import { IRequestDeleteHandler, RequestDeleteCommand } from '@packages/core/common/http/axioma'
import { Bus, inject } from '@fancy-crud/bus'
import { FetchListDataCommand, ITableStore } from '../axioma'
import type { DeleteRecordCommand, DeleteRecordOptions, IDeleteRecordHandler, Row } from '../axioma'

export class DeleteRecordHandler implements IDeleteRecordHandler {
  constructor(
    private requestDelete: IRequestDeleteHandler = inject(IRequestDeleteHandler),
    private tableStore: ITableStore = inject(ITableStore),
  ) {}

  execute({ tableId, row, options, tableSettings }: DeleteRecordCommand): void {
    if (!row && !tableSettings.rowToDelete)
      return

    const bus = new Bus()

    const tableStore = this.tableStore

    const defaultOptions: DeleteRecordOptions = {
      onRequestDeleteConfirmation(row: Row) {
        tableSettings.rowToDelete = row
        tableSettings.displayConfirmationDialog = true
      },
      onFinally() {
        const table = tableStore.searchById(tableId)!

        bus.execute(
          new FetchListDataCommand(tableId, table.pagination.page, table.list.options),
        )
        tableSettings.rowToDelete = null
        tableSettings.displayConfirmationDialog = false
      },
      ...options,
    }

    if (defaultOptions.onRequestDeleteConfirmation && tableSettings.skipDeleteConfirmation !== true && !tableSettings.rowToDelete) {
      defaultOptions.onRequestDeleteConfirmation(row)
      return
    }

    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(tableSettings.rowToDelete, tableSettings.lookupField))
      lookupValue = String(tableSettings.rowToDelete[tableSettings.lookupField])

    const command = new RequestDeleteCommand(tableSettings.url, lookupValue, defaultOptions)
    this.requestDelete.execute(command)
  }
}
