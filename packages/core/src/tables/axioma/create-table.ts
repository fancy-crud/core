import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { BaseTableForm, MappedRawColumn, ObjectWithRawColumns, RawTableFilters, RawTablePagination, RawTableSettings, Table } from '@packages/core/tables/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class CreateTableCommand<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters> implements BaseCommand {
  public readonly meta = meta(ICreateTableHandler)

  constructor(
    public readonly form: T,
    public readonly columns?: MappedRawColumn<T['fields'], U> & U,
    public readonly pagination?: RawTablePagination,
    public readonly settings?: S,
    public readonly filterParams?: F,
  ) {}
}

export abstract class ICreateTableHandler {
  abstract execute<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters>(command: CreateTableCommand<T, U, S, F>): Table<T, U, S, F>
}
