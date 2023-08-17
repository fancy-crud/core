import type { DeleteRequestOptions } from '@packages/core/common/http/axioma'
import type { NormalizedTableFilters } from './filters'
import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, ObjectWithNormalizedColumns } from './column'
import type { NormalizedTablePagination, RawTablePagination } from './pagination'
import type { NormalizedTableSettings } from './settings'

export interface TableStoreState {
  formId: symbol
  columns: ObjectWithNormalizedColumns
  settings: NormalizedTableSettings
  pagination: NormalizedTablePagination
  filterParams: NormalizedTableFilters
}

export interface Row extends Record<string, unknown> {}

export interface SetupOptions {
  onReady?: () => void
  onClickAux?: () => void
}

export interface DeleteRecordOptions extends DeleteRequestOptions {
  onRequestDeleteConfirmation?: (row: Row) => void
}

export interface Table<T extends BaseTableForm, U, S, F> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], NormalizedColumn> & U
  settings: S
  pagination: NormalizedTablePagination
  filterParams: F
}

export interface RawTable<T extends BaseTableForm, U, S, F> {
  id?: string
  form: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: RawTablePagination
  settings?: S
  filterParams?: F
}
