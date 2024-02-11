import { Bus, inject } from '@fancy-crud/bus'
import type { BaseTableForm, CreateTableCommand, FieldAsColumn, ICreateTableHandler, NormalizedColumn, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, ObjectWithRawColumns, RawTableFilters, RawTableList, RawTablePagination, RawTableSettings, Row, Table } from '../axioma'
import { DeleteRecordCommand, FetchListDataCommand, ITableStore, NormalizeColumnsCommand, NormalizePaginationCommand, NormalizeTableButtonsCommand, NormalizeTableFiltersCommand, NormalizeTableListCommand, NormalizeTableSettingsCommand, PrepareFormToCreateCommand, PrepareFormToUpdateCommand } from '../axioma'
import type { ConvertToNormalizedTableButtons, RawTableButtons } from '../axioma/typing/buttons'

export class CreateTableHandler implements ICreateTableHandler {
  constructor(
    private tableStore: ITableStore = inject(ITableStore),
  ) {}

  execute<
  TableFormType extends BaseTableForm,
  TableColumnsType extends ObjectWithRawColumns,
  TableSettingsType extends RawTableSettings,
  TableFiltersType extends RawTableFilters,
  TableButtonsType extends RawTableButtons,
  TableListType extends RawTableList,
  TablePaginationType extends RawTablePagination,
>(command: CreateTableCommand<TableFormType, TableColumnsType, TableSettingsType, TableFiltersType, TableButtonsType, TableListType, TablePaginationType>): Table<TableFormType, TableColumnsType, TableSettingsType, TableFiltersType, TableButtonsType, TableListType, TablePaginationType> {
    const {
      form,
      columns: rawColumns = {},
      pagination: rawPagination = {},
      filterParams: rawFilterParams = {},
      buttons: rawButtons,
      settings: rawSettings = {
        url: form?.settings?.url,
      },
      list: rawList = {} as RawTableList,
    } = command

    const bus = new Bus()
    const id = Symbol('')

    const columns = bus.execute(
      new NormalizeColumnsCommand(rawColumns, form.fields),
    ) as FieldAsColumn<TableFormType['fields'], NormalizedColumn> & TableColumnsType

    const pagination = bus.execute(
      new NormalizePaginationCommand(rawPagination),
    ) as TablePaginationType & NormalizedTablePagination

    const settings = bus.execute(
      new NormalizeTableSettingsCommand(rawSettings),
    ) as TableSettingsType & NormalizedTableSettings

    const filterParams = bus.execute(
      new NormalizeTableFiltersCommand(rawFilterParams),
    ) as TableFiltersType

    const buttons = bus.execute(
      new NormalizeTableButtonsCommand(rawButtons),
    ) as TableButtonsType & ConvertToNormalizedTableButtons<TableButtonsType>

    const list = bus.execute(
      new NormalizeTableListCommand(rawList),
    ) as TableListType & NormalizedTableList

    const tableStore = this.tableStore
    buttons.add.onClick = rawButtons?.add?.onClick || (() => {
      const table = tableStore.searchById(id)!

      bus.execute(
        new PrepareFormToCreateCommand(form.id, {
          onClickAux: () => {
            table.settings.displayFormDialog = false
          },
        }),
      )

      table.settings.displayFormDialog = true
    })

    buttons.edit.onClick = rawButtons?.edit?.onClick || ((row: Row) => {
      const table = tableStore.searchById(id)!

      bus.execute(
        new PrepareFormToUpdateCommand(table.formId, row, table.settings, {
          onClickAux: () => {
            table.settings.displayFormDialog = false
          },
        }),
      )

      table.settings.displayFormDialog = true
    })

    buttons.remove.onClick = rawButtons?.remove?.onClick || ((row: Row) => {
      const table = tableStore.searchById(id)!

      bus.execute(
        new DeleteRecordCommand(id, row, table.settings),
      )
    })

    list.fetchData = rawList.fetchData || (() => {
      const table = tableStore.searchById(id)!
      bus.execute(
        new FetchListDataCommand(id, table.pagination.page, table.list.options),
      )
    })

    this.tableStore.save(id, {
      formId: form.id,
      columns,
      settings,
      pagination,
      filterParams,
      buttons,
      list,
    })

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
}

