import { BaseTable, ResetTablePaginationCommand, injectable } from '@fancy-crud/core'

export class VueTable extends BaseTable {
  constructor() {
    super()
  }

  setTableId(id: symbol): void {
    this.id = id
  }

  createWatchers() {
    const table = this.tableStore.searchById(this.id)!

    watch(() => table.filterParams, () => this.bus.execute(
      new ResetTablePaginationCommand(this.id),
    ), { deep: true })

    watch(() => table.pagination.page, () => {
      if (table.list.options?.hotFetch !== false)
        this.triggerFetchItems()
    })

    watch(() => table.pagination.rowsPerPage, () => {
      if (table.list.options?.hotFetch !== false)
        this.triggerFetchItems()
    })
  }
}

injectable('IBaseTable', VueTable)
