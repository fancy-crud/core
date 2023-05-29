import type { ObjectWithNormalizedColumns } from './column'
import type { NormalizedTablePagination } from './pagination'
import type { NormalizedTableSetting } from './settings'
import type { DeleteRequestOptions } from '@/http/axioma'
import type { FormManager } from '@/forms/axioma'

export interface TableMap {
  columns: ObjectWithNormalizedColumns
  formManager: FormManager
  settings: NormalizedTableSetting
  pagination: NormalizedTablePagination
}

export interface Row extends Record<string, unknown> {}

export interface SetupOptions {
  onReady?: () => void
  onClickAux?: () => void
}

export interface DeleteRecordOptions extends DeleteRequestOptions {
  onRequestDeleteConfirmation?: (row: Row) => void
}

export interface TableManager {
  getTable: () => TableMap
  addTable: (table: TableMap) => void
  removeTable: () => void
  setupFormToCreateRecord: (options?: SetupOptions) => void
  setupFormToEditRecord: (row: Row, options?: SetupOptions) => void
  deleteRecord: (row: Row | null, options?: DeleteRecordOptions) => void
  updateCheckbox: (value: { field: string; row: Row }) => void
}
