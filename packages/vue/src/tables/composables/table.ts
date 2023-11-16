import type { BaseTableForm, FieldAsColumn, NormalizedColumn, NormalizedSettings, NormalizedTableButtons, ObjectWithRawColumns, RawTableButtons, RawTableFilters, RawTableSettings } from '@fancy-crud/core'
import { Bus, CreateTableCommand, DeleteStoreTableCommand, SetStoreTableCommand } from '@fancy-crud/core'
import type { TableArgs, UseTable } from '../typing'

export function useTable<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters, B extends RawTableButtons>(
  args: TableArgs<T, U, S, F, B>,
): UseTable<T, U, S, F, B> {
  const {
    id: _id,
    form,
    columns: rawColumns = {},
    settings: rawSettings = {},
    pagination: rawPagination = {},
    filterParams: rawFilterParams = {},
    buttons: rawButtons = {},
  } = args

  const bus = new Bus()
  const id = Symbol(_id)

  const table = bus.execute(
    new CreateTableCommand(
      form, rawColumns, rawPagination, rawSettings, rawFilterParams, rawButtons,
    ),
  )

  const columns = reactive(table.columns) as FieldAsColumn<T['fields'], NormalizedColumn> & U
  const settings = reactive(table.settings) as S & NormalizedSettings
  const pagination = reactive(table.pagination)
  const filterParams = reactive(table.filterParams) as F
  const buttons = reactive(table.buttons) as B & NormalizedTableButtons

  bus.execute(
    new SetStoreTableCommand(id, {
      columns,
      settings,
      pagination,
      filterParams,
      formId: form.id,
      buttons,
    }),
  )

  onUnmounted(() => bus.execute(
    new DeleteStoreTableCommand(id),
  ))

  return {
    id,
    columns,
    form,
    settings,
    pagination,
    filterParams,
    buttons,
  }
}
