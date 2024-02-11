import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { BaseTableForm, MappedRawColumn, ObjectWithRawColumns, RawTableFilters, RawTableList, RawTablePagination, RawTableSettings, Table } from '@packages/core/tables/axioma'
import { meta } from '@fancy-crud/bus'
import type { RawTableButtons } from '../typing/buttons'

export class CreateTableCommand<
  T extends BaseTableForm,
  U extends ObjectWithRawColumns,
  S extends RawTableSettings,
  F extends RawTableFilters,
  B extends RawTableButtons,
  L extends RawTableList,
  P extends RawTablePagination,
> implements BaseCommand {
  public readonly meta = meta(ICreateTableHandler)

  constructor(
    public readonly form: T,
    public readonly columns?: MappedRawColumn<T['fields'], U> & U,
    public readonly pagination?: P,
    public readonly settings?: S,
    public readonly filterParams?: F,
    public readonly buttons?: B,
    public readonly list?: L,
  ) {}
}

export abstract class ICreateTableHandler implements BaseHandler {
  abstract execute<T extends BaseTableForm, U extends ObjectWithRawColumns, S extends RawTableSettings, F extends RawTableFilters, B extends RawTableButtons, L extends RawTableList, P extends RawTablePagination>(command: CreateTableCommand<T, U, S, F, B, L, P>): Table<T, U, S, F, B, L, P>
}
