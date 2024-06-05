import type { BaseTableForm, ConvertToNormalizedColumns, ConvertToNormalizedTableButtons, MappedRawColumn, NormalizedColumn, NormalizedTableButtons, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, ObjectWithRawColumns, Pagination, RawTableButtons, RawTableList, RawTablePagination, RawTableSettings } from '@fancy-crud/core'

export interface TableArgs<
  T extends BaseTableForm,
  U,
  S extends RawTableSettings,
  F,
  B extends RawTableButtons,
  L,
  P extends RawTablePagination,
> {
  id?: string
  form?: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: P
  settings?: S
  filterParams?: F
  buttons?: B
  list?: RawTableList<L>
}

export interface UseTable<T extends BaseTableForm = any, U extends ObjectWithRawColumns = any, S = any, F = any, B = any, L = any, P = any> {
  id: symbol
  form: T
  columns: ConvertToNormalizedColumns<T, U>
  settings: S & NormalizedTableSettings
  pagination: P & NormalizedTablePagination
  filterParams: F
  buttons: ConvertToNormalizedTableButtons<B>
  list: NormalizedTableList<L>
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
