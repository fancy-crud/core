import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, NormalizedTablePagination, RawTableButtons, RawTablePagination } from '@fancy-crud/core'

export interface TableArgs<T extends BaseTableForm, U, S, F, B extends RawTableButtons> {
  id?: string
  form: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: RawTablePagination
  settings?: S
  filterParams?: F
  buttons?: B
}

export interface UseTable<T extends BaseTableForm, U, S, F, B> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], NormalizedColumn> & U
  settings: S
  pagination: NormalizedTablePagination
  filterParams: F
  buttons: B
}
