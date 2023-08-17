import type { BaseTableForm, FieldAsColumn, NormalizedColumn, NormalizedSettings, ObjectWithRawColumns, RawTableFilters, RawTableSettings } from '@fancy-crud/core'
import { Bus, CreateTableCommand, DeleteStoreTableCommand, SetStoreTableCommand } from '@fancy-crud/core'
import type { TableArgs, UseTable } from '../typing'

export function useTable<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters>(
  args: TableArgs<T, U, S, F>,
): UseTable<T, U, S, F> {
  const {
    id: _id,
    form,
    columns: rawColumns = {},
    settings: rawSettings = {},
    pagination: rawPagination = {},
    filterParams: rawFilterParams = {},
  } = args

  const bus = new Bus()
  const id = Symbol(_id)

  const table = bus.execute(
    new CreateTableCommand(
      form, rawColumns, rawPagination, rawSettings, rawFilterParams,
    ),
  )

  const columns = reactive(table.columns) as FieldAsColumn<T['fields'], NormalizedColumn> & U
  const settings = reactive(table.settings) as S & NormalizedSettings
  const pagination = reactive(table.pagination)
  const filterParams = reactive(table.filterParams) as F

  bus.execute(
    new SetStoreTableCommand(id, {
      columns,
      settings,
      pagination,
      filterParams,
      formId: form.id,
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
  }
}
