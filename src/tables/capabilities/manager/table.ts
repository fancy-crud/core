import type { DeleteRecordOptions, Row, SetupOptions, TableManager, TableMap } from '@/tables/axioma'

export class TableManagerHandler implements TableManager {
  private static readonly tables = new Map<symbol, TableMap>()

  constructor(private id: symbol) {}

  getTable() {
    const table = TableManagerHandler.tables.get(this.id)

    if (!table)
      throw new Error(`Unable to found table id(${String(this.id)})`)

    return table
  }

  addTable(table: TableMap) {
    TableManagerHandler.tables.set(this.id, table)
  }

  removeTable() {
    TableManagerHandler.tables.delete(this.id)
  }

  setupFormToCreateRecord(options?: SetupOptions) {
    const { formManager } = this.getTable()
    const form = formManager.getForm()

    if (typeof form.buttons.aux.onClick !== 'function' && options?.onClickAux)
      Object.assign(form.buttons.aux, { onClick: options.onClickAux })

    formManager.switchToCreateMode()
    formManager.resetFields()

    if (options?.onReady)
      options.onReady()
  }

  setupFormToEditRecord(row: Row, options?: SetupOptions) {
    const { formManager, settings } = this.getTable()
    const form = formManager.getForm()
    formManager.resetFields()

    type rowKey = keyof typeof row
    const lookupField = (settings.lookupField || form.settings.lookupField) as rowKey
    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(row, lookupField))
      lookupValue = String(row[lookupField])

    if (typeof form.buttons.aux.onClick !== 'function' && options?.onClickAux)
      Object.assign(form.buttons.aux, { onClick: options.onClickAux })

    useRetrieveRequest(settings.url, lookupValue, {
      onSuccess(response: { data: Record<string, unknown> }) {
        formManager.fillWithRecordValues(response.data || {})
        formManager.switchToUpdateMode()

        if (options?.onReady)
          options.onReady()
      },
    })
  }

  deleteRecord(row: Row | null, options?: DeleteRecordOptions) {
    if (!row)
      return

    const { formManager, settings } = this.getTable()
    const form = formManager.getForm()

    if (options?.onRequestDeleteConfirmation && !settings.skipDeleteConfirmation) {
      options.onRequestDeleteConfirmation(row)
      return
    }

    const lookupField = settings.lookupField || form.settings.lookupField
    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(row, lookupField))
      lookupValue = String(row[lookupField])

    useRequestDelete(settings.url, lookupValue, options)
  }

  updateCheckbox(value: { field: string; row: Row }) {
    const { formManager, settings } = this.getTable()
    const form = formManager.getForm()

    const lookupField = settings.lookupField || form.settings.lookupField
    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(value.row, lookupField))
      lookupValue = String(value.row[lookupField])

    useRequestUpdate(settings.url, lookupValue, {
      [value.field]: !value.row[value.field],
    })
  }
}
