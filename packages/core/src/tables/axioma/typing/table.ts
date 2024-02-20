import type { DeleteRequestOptions, OnFinally } from '@packages/core/common/http/axioma'
import type { NormalizedTableFilters } from './filters'
import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, ObjectWithNormalizedColumns } from './column'
import type { NormalizedTablePagination } from './pagination'
import type { NormalizedTableSettings } from './settings'
import type { NormalizedTableButtons } from './buttons'
import type { NormalizedTableList } from './list'

export interface TableStoreState {
  formId: symbol
  columns: ObjectWithNormalizedColumns
  settings: NormalizedTableSettings
  pagination: NormalizedTablePagination
  filterParams: NormalizedTableFilters
  buttons: NormalizedTableButtons
}

export type Row = any

export interface SetupOptions {
  onReady?: () => void
  onClickAux?: () => void
}

export interface DeleteRecordOptions extends DeleteRequestOptions {
  onRequestDeleteConfirmation?: (row: Row) => void
  onFinally: OnFinally
}

export interface Table<T extends BaseTableForm, U, S, F, B, L, P> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], NormalizedColumn> & U
  settings: S & NormalizedTableSettings
  pagination: P & NormalizedTablePagination
  filterParams: F
  buttons: B & NormalizedTableButtons
  list: NormalizedTableList<L>
}

export interface RawTable<T extends BaseTableForm, U, S, F, B, L, P> {
  id?: string
  form: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: P
  settings?: S
  filterParams?: F
  buttons?: B
  list?: L
}

export interface BaseTableState {
  formModal: boolean
  confirmationModal: boolean
  rowToDelete: Row | null
}
