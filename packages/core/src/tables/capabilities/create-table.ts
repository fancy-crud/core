import { Bus } from '@packages/core/common/bus/capabilities'
import type { BaseTableForm, CreateTableCommand, FieldAsColumn, ICreateTableHandler, NormalizedColumn, NormalizedTableSettings, ObjectWithRawColumns, RawTableFilters, RawTableSettings, Table } from '../axioma'
import { NormalizeColumnsCommand, NormalizePaginationCommand, NormalizeTableFiltersCommand, NormalizeTableSettingsCommand, SetStoreTableCommand } from '../axioma'

export class CreateTableHandler implements ICreateTableHandler {
  execute<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters>(command: CreateTableCommand<T, U, S, F>): Table<T, U, S, F> {
    const {
      form,
      columns: rawColumns = {},
      settings: rawSettings = {
        url: form.settings.url,
      },
      pagination: rawPagination = {},
      filterParams: rawFilterParams = {},
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

    bus.execute(
      new SetStoreTableCommand(id, {
        formId: form.id,
        columns,
        settings,
        pagination,
        filterParams,
      }),
    )

    return {
      id,
      columns,
      form,
      settings,
      pagination,
      filterParams,
    }
  }
}

