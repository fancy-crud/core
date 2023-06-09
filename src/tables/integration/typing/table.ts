import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, NormalizedTablePagination, RawTablePagination, TableManager } from '@fancy-crud/core'

export interface TableArgs<T extends BaseTableForm, U, S, F> {
  id?: string
  form: T
  columns?: MappedRawColumn<T['fields'], U> & U
  pagination?: RawTablePagination
  settings?: S
  filterParams?: F
}

export interface UseTable<T extends BaseTableForm, U, S, F> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], NormalizedColumn> & U
  settings: S
  pagination: NormalizedTablePagination
  filterParams: F
  manager: TableManager
}
