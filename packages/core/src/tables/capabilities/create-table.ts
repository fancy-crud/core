import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { BaseTableForm, FieldAsColumn, MappedRawColumn, NormalizedColumn, NormalizedTableSettings, ObjectWithRawColumns, RawTableFilters, RawTablePagination, RawTableSettings, Table } from '@packages/core/tables/axioma'
import { NormalizeColumnsCommand, NormalizePaginationCommand, SetStoreTableCommand } from '@packages/core/tables/capabilities'
import { Bus, meta } from '@packages/core/common/bus/capabilities'
import { NormalizeTableFiltersCommand } from './normalize-table-filters'
import { NormalizeTableSettingsCommand } from './normalize-table-settings'

export class CreateTableCommand<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters> implements BaseCommand {
  public readonly meta = meta(CreateTableHandler)

  constructor(
    public readonly form: T,
    public readonly columns?: MappedRawColumn<T['fields'], U> & U,
    public readonly pagination?: RawTablePagination,
    public readonly settings?: S,
    public readonly filterParams?: F,
  ) {}
}

class CreateTableHandler {
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
