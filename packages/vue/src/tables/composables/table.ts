import type { BaseTableForm, FieldAsColumn, NormalizedColumn, NormalizedTableButtons, NormalizedTableList, NormalizedTableSettings, ObjectWithRawColumns, RawTableButtons, RawTableFilters, RawTableList, RawTableSettings } from '@fancy-crud/core'
import { Bus, CreateTableCommand, ITableStore, inject as injecting } from '@fancy-crud/core'
import type { TableArgs, UseTable } from '../typing'

export function useTable<
  T extends BaseTableForm,
  U extends ObjectWithRawColumns,
  S extends RawTableSettings,
  F extends RawTableFilters,
  B extends RawTableButtons,
  L extends RawTableList,
>(
  args: TableArgs<T, U, S, F, B, L>,
): UseTable<T, U, S, F, B, L> {
  const {
    id: _id,
    form,
    columns: rawColumns = {},
    settings: rawSettings = {
      url: form.settings?.url,
    },
    pagination: rawPagination = {},
    filterParams: rawFilterParams = {},
    buttons: rawButtons = {},
    list: rawList = {},
  } = args

  const tableStore: ITableStore = injecting(ITableStore.name)!
  const bus = new Bus()
  const id = Symbol(_id)

  const table = bus.execute(
    new CreateTableCommand(
      form, rawColumns, rawPagination, rawSettings, rawFilterParams, rawButtons, rawList,
    ),
  )

  const columns = reactive(table.columns) as FieldAsColumn<T['fields'], NormalizedColumn> & U
  const settings = reactive(table.settings) as S & NormalizedTableSettings
  const pagination = reactive(table.pagination)
  const filterParams = reactive(table.filterParams) as F
  const buttons = reactive(table.buttons) as B & NormalizedTableButtons
  const list = reactive(table.list) as L & NormalizedTableList

  tableStore.save(id, {
    columns,
    settings,
    pagination,
    filterParams,
    formId: form.id,
    buttons,
    list,
  })

  onUnmounted(() => tableStore.deleteById(id))

  return {
    id,
    columns,
    form,
    settings,
    pagination,
    filterParams,
    buttons,
    list,
  }
}
