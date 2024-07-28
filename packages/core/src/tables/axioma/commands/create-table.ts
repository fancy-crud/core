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
  L,
  P extends RawTablePagination,
  RecordType,
> implements BaseCommand {
  public readonly meta = meta(ICreateTableHandler)

  constructor(
    public readonly form: T,
    public readonly columns?: MappedRawColumn<T['fields'], U>,
    public readonly pagination?: P,
    public readonly settings?: S,
    public readonly filterParams?: F,
    public readonly buttons?: B,
    public readonly list?: RawTableList<L>,
    public readonly record?: RecordType,
  ) {}
}

export abstract class ICreateTableHandler implements BaseHandler {
  abstract execute<
    T extends BaseTableForm,
    U extends ObjectWithRawColumns,
    S extends RawTableSettings,
    F extends RawTableFilters,
    B extends RawTableButtons,
    L,
    P extends RawTablePagination,
    RecordType = any,
  >(command: CreateTableCommand<T, U, S, F, B, L, P, RecordType>): Table<T, U, S, F, B, L, P, RecordType>
}
