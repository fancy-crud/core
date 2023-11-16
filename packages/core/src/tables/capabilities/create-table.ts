import { Bus } from '@fancy-crud/bus'
import type { BaseTableForm, CreateTableCommand, FieldAsColumn, ICreateTableHandler, NormalizedColumn, NormalizedTableSettings, ObjectWithRawColumns, RawTableFilters, RawTableSettings, Table } from '../axioma'
import { NormalizeColumnsCommand, NormalizePaginationCommand, NormalizeTableButtonsCommand, NormalizeTableFiltersCommand, NormalizeTableSettingsCommand, SetStoreTableCommand } from '../axioma'
import type { ConvertToNormalizedTableButtons, RawTableButtons } from '../axioma/typing/buttons'

export class CreateTableHandler implements ICreateTableHandler {
  execute
  <T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters, B extends RawTableButtons>(command: CreateTableCommand<T, U, S, F, B>): Table<T, U, S, F, B> {
    const {
      form,
      columns: rawColumns = {},
      settings: rawSettings = {
        url: form.settings.url,
      },
      pagination: rawPagination = {},
      filterParams: rawFilterParams = {},
      buttons: rawButtons,
    } = command

    const bus = new Bus()
    const id = Symbol('')

    const columns = bus.execute(
      new NormalizeColumnsCommand(form.fields, rawColumns),
    ) as FieldAsColumn<T['fields'], NormalizedColumn> & U

    const pagination = bus.execute(
      new NormalizePaginationCommand(rawPagination),
    )

    const settings = bus.execute(
      new NormalizeTableSettingsCommand(rawSettings),
    ) as S & NormalizedTableSettings

    const filterParams = bus.execute(
      new NormalizeTableFiltersCommand(rawFilterParams),
    ) as F

    const buttons = bus.execute(
      new NormalizeTableButtonsCommand(rawButtons),
    ) as B & ConvertToNormalizedTableButtons<B>

    bus.execute(
      new SetStoreTableCommand(id, {
        formId: form.id,
        columns,
        settings,
        pagination,
        filterParams,
        buttons,
      }),
    )

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
}

