import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, NormalizedTableButtons, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, Pagination, RawTableButtons, RawTableList, RawTablePagination, RawTableSettings } from '@fancy-crud/core'

export interface TableArgs<
  T extends BaseTableForm,
  U,
  S extends RawTableSettings,
  F,
  B extends RawTableButtons,
  L extends RawTableList,
  P extends RawTablePagination,
> {
  id?: string
  form: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: P
  settings?: S
  filterParams?: F
  buttons?: B
  list?: L
}

export interface UseTable<T extends BaseTableForm, U, S, F, B, L extends RawTableList, P> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], NormalizedColumn> & U
  settings: S & NormalizedTableSettings
  pagination: P & NormalizedTablePagination
  filterParams: F
  buttons: B & NormalizedTableButtons
  list: L & NormalizedTableList
}

export interface TableBodyProps {
  items: any[]
  headers: NormalizedColumn[]
  loading: boolean
  buttons: NormalizedTableButtons
}

export interface TableBodyEmit {
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
}

export interface TableFooterProps {
  pagination: NormalizedTablePagination
}

export interface TableFooterEmit {
  (e: 'update:pagination', pagination: Pagination): void
}
