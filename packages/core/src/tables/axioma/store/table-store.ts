import type { NormalizedTableButtons, NormalizedTableFilters, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, ObjectWithNormalizedColumns } from '@packages/core/tables/axioma'

export interface TableState {
  formId: symbol
  columns: ObjectWithNormalizedColumns
  settings: NormalizedTableSettings
  pagination: NormalizedTablePagination
  filterParams: NormalizedTableFilters
  buttons: NormalizedTableButtons
  list: NormalizedTableList
  record: any | null
}

export abstract class ITableStore {
  abstract save(id: symbol, payload: TableState): void
  abstract searchById(id: symbol): TableState | undefined
  abstract deleteById(id: symbol): void
}
