import { Bus, inject, injectable } from '@fancy-crud/bus'
import type { Pagination } from '@packages/core/common/http/axioma'
import type { DeleteRecordOptions, Row } from '../axioma'
import { DeleteRecordCommand, FetchListDataCommand, ITableStore, PrepareFormToCreateCommand, PrepareFormToUpdateCommand } from '../axioma'

export class BaseTable {
  public readonly bus = new Bus()
  protected id!: symbol

  constructor(
    protected readonly tableStore: ITableStore = inject(ITableStore.name),
  ) {}

  setTableId(id: symbol) {
    this.id = id
  }

  triggerFetchItems() {
    const table = this.tableStore.searchById(this.id)!

    this.bus.execute(
      new FetchListDataCommand(this.id, table.pagination.page, table.list.options),
    )
  }

  exportData() {
    // TODO: Create a plugin to export data
    // emit('export')
  }

  onSuccess() {
    this.triggerFetchItems()
    this.closeModal()
  }

  setPagination(newPagination: Pagination) {
    const table = this.tableStore.searchById(this.id)!
    Object.assign(table.pagination, newPagination)
  }

  closeModal() {
    const table = this.tableStore.searchById(this.id)!
    table.settings.displayFormDialog = false
  }

  openModal() {
    const table = this.tableStore.searchById(this.id)!
    table.settings.displayFormDialog = true
  }

  openCreateModal() {
    const table = this.tableStore.searchById(this.id)!
    const closeModal = () => this.closeModal()
    this.bus.execute(
      new PrepareFormToCreateCommand(table.formId, {
        onClickAux: closeModal,
      }),
    )
    this.openModal()
  }

  openEditModal(row: Row) {
    const table = this.tableStore.searchById(this.id)!
    const closeModal = () => this.closeModal()

    this.bus.execute(
      new PrepareFormToUpdateCommand(table.formId, row, table.settings, {
        onClickAux: closeModal,
      }),
    )

    this.openModal()
  }

  onDelete(row: Row | null, skipDeleteConfirmation?: boolean) {
    if (!row)
      return

    const table = this.tableStore.searchById(this.id)!
    const onFinally = () => this.triggerFetchItems()

    const options: DeleteRecordOptions = {
      onRequestDeleteConfirmation(row: Row) {
        table.settings.rowToDelete = row
        table.settings.displayConfirmationDialog = true
      },
      onFinally,
    }

    if (skipDeleteConfirmation)
      options.onRequestDeleteConfirmation = undefined

    this.bus.execute(
      new DeleteRecordCommand(row, table.settings, options),
    )
  }

  updateCheckbox() {
    throw new Error('This method is not implemented')
  }
}

injectable('IBaseTable', BaseTable)
