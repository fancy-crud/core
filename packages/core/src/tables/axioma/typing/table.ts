import type { DeleteRequestOptions } from '@packages/core/common/http/axioma'
import type { NormalizedTableFilters } from './filters'
import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, ObjectWithNormalizedColumns } from './column'
import type { NormalizedTablePagination, RawTablePagination } from './pagination'
import type { NormalizedTableSettings } from './settings'
import type { NormalizedTableButtons } from './buttons'

export interface TableStoreState {
  formId: symbol
  columns: ObjectWithNormalizedColumns
  settings: NormalizedTableSettings
  pagination: NormalizedTablePagination
  filterParams: NormalizedTableFilters
  buttons: NormalizedTableButtons
}

export interface Row extends Record<string, unknown> {}

export interface SetupOptions {
  onReady?: () => void
  onClickAux?: () => void
}

export interface DeleteRecordOptions extends DeleteRequestOptions {
  onRequestDeleteConfirmation?: (row: Row) => void
}

export interface Table<T extends BaseTableForm, U, S, F, B> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], NormalizedColumn> & U
  settings: S
  pagination: NormalizedTablePagination
  filterParams: F
  buttons: B & NormalizedTableButtons
}

export interface RawTable<T extends BaseTableForm, U, S, F, B> {
  id?: string
  form: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: RawTablePagination
  settings?: S
  filterParams?: F
  buttons?: B
}
