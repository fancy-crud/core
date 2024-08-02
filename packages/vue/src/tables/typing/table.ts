import type { BaseTableForm, ConvertToNormalizedTableButtons, FieldAsColumn, MappedRawColumn, NormalizedColumn, NormalizedTableButtons, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, Pagination, RawTableButtons, RawTableList, RawTablePagination, RawTableSettings } from '@fancy-crud/core'
import type { ArgProxy } from '@packages/vue/common'

type MappedRawColumnsOrder<S extends RawTableSettings, U> = S & { columnsOrder?: (keyof U | '...')[] }
type MappedNormalizedColumnsOrder<S, U> = Omit<S, 'columnsOrder'> & NormalizedTableSettings & { columnsOrder: (keyof U | '...')[] }

export interface UseTable<
  T extends BaseTableForm,
  U,
  S extends RawTableSettings,
  F,
  B,
  L,
  P,
  RecordType = any,
> {
  id: symbol
  form: T
  columns: S['autoInferColumns'] extends false ? FieldAsColumn<{}, U> : FieldAsColumn<T['fields'], U>
  settings: MappedNormalizedColumnsOrder<S, MappedRawColumn<T['fields'], U>>
  pagination: P & NormalizedTablePagination
  filterParams: F
  buttons: ConvertToNormalizedTableButtons<B>
  list: NormalizedTableList<L>
  record: RecordType
}

export interface TableArgs<
  T extends BaseTableForm,
  U,
  S extends RawTableSettings,
  F,
  B extends RawTableButtons,
  L,
  P extends RawTablePagination,
  RecordType = any,
> {
  id?: string
  form?: T
  columns?: ArgProxy<MappedRawColumn<T['fields'], U>, UseTable<T, U, S, F, B, L, P, RecordType>>
  pagination?: ArgProxy<P, UseTable<T, U, S, F, B, L, P, RecordType>>
  settings?: ArgProxy<MappedRawColumnsOrder<S, MappedRawColumn<T['fields'], U>>, UseTable<T, U, S, F, B, L, P, RecordType>>
  filterParams?: ArgProxy<F, UseTable<T, U, S, F, B, L, P, RecordType>>
  buttons?: ArgProxy<B, UseTable<T, U, S, F, B, L, P, RecordType>>
  list?: ArgProxy<RawTableList<L>, UseTable<T, U, S, F, B, L, P, RecordType>>
  record?: RecordType
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
