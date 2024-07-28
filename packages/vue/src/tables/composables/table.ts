import type { BaseTableForm, ConvertToNormalizedTableButtons, FieldAsColumn, MappedRawColumn, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, ObjectWithRawColumns, RawTableButtons, RawTableFilters, RawTablePagination, RawTableSettings } from '@fancy-crud/core'
import { Bus, CreateTableCommand, ITableStore, injectable, inject as injecting } from '@fancy-crud/core'
import { useProxies } from '@packages/vue/common/composables'
import type { TableArgs, UseTable } from '../typing'
import { TableStoreService } from './table-store.service'

injectable(ITableStore.name, TableStoreService)

export function useTable<
  T extends BaseTableForm,
  U extends ObjectWithRawColumns,
  S extends RawTableSettings,
  F extends RawTableFilters,
  B extends RawTableButtons,
  L,
  P extends RawTablePagination,
  RecordType = any,
>(
  args: TableArgs<T, U, S, F, B, L, P, RecordType>,
): UseTable<T, U, S, F, B, L, P, RecordType> {
  const baseForm = { id: Symbol(''), settings: { url: '' } } as T

  const {
    form = baseForm,
    columns: rawColumns = {},
    settings: rawSettings = {
      url: form?.settings?.url,
    },
    pagination: rawPagination = {},
    filterParams: rawFilterParams = {},
    buttons: rawButtons = {},
    list: rawList = {},
    record = null,
  } = args

  const tableStore: ITableStore = injecting(ITableStore.name)!
  const bus = new Bus()

  type ProxyCollection = [
    FieldAsColumn<T['fields'], U>,
    S & NormalizedTableSettings,
    P & NormalizedTablePagination,
    F,
    ConvertToNormalizedTableButtons<B>,
    NormalizedTableList<L>,
  ]
  const { proxies, createProxy } = useProxies<ProxyCollection>([
    rawColumns,
    rawSettings,
    rawPagination,
    rawFilterParams,
    rawButtons,
    rawList,
  ], [true, false, false, false, true, false])

  const [columns, settings, pagination, filterParams, buttons, list] = proxies

  const table = bus.execute(
    new CreateTableCommand(
      form, columns as unknown as MappedRawColumn<T['fields'], U>, pagination, settings, filterParams, buttons, list, record,
    ),
  )

  Object.assign(columns, table.columns)
  Object.assign(settings, table.settings)
  Object.assign(pagination, table.pagination)
  Object.assign(filterParams, table.filterParams)
  Object.assign(buttons, table.buttons)
  Object.assign(list, table.list)

  tableStore.save(table.id, {
    columns,
    settings,
    pagination,
    filterParams,
    formId: form.id,
    buttons,
    list,
    record: table.record,
  })

  createProxy(table)

  onUnmounted(() => tableStore.deleteById(table.id))

  return {
    id: table.id,
    columns,
    form,
    settings,
    pagination,
    filterParams,
    buttons,
    list,
    record: table.record,
  }
}
