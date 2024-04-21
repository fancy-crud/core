import type { BaseTableForm, ConvertToNormalizedTableButtons, FieldAsColumn, MappedRawColumn, NormalizedColumn, NormalizedTableButtons, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, Pagination, RawTableButtons, RawTableList, RawTablePagination, RawTableSettings } from '@fancy-crud/core'
import type { ArgProxy } from '@packages/vue/common'

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
  columns?: ArgProxy<MappedRawColumn<T['fields'], U>>
  pagination?: ArgProxy<P>
  settings?: ArgProxy<S>
  filterParams?: ArgProxy<F>
  buttons?: ArgProxy<B>
  list?: ArgProxy<RawTableList<L>>
}

export interface UseTable<T extends BaseTableForm = any, U = any, S = any, F = any, B = any, L = any, P = any> {
  id: symbol
  form: T
  columns: FieldAsColumn<T['fields'], U>
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
