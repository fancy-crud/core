import type { NormalizedTableSettings, Row } from '@packages/core/tables/axioma'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { RetrieveRequestOptions } from '@packages/core/common/http/axioma'
import { meta } from '@fancy-crud/bus'

export class UpdateRowValueCommand<T extends Row = Row> implements BaseCommand {
  public readonly meta = meta(IUpdateRowValueHandler)

  constructor(
    public readonly newValue: unknown,
    public readonly row: T,
    public readonly field: keyof T,
    public readonly tableSettings: NormalizedTableSettings,
    public readonly options?: RetrieveRequestOptions,
  ) {}
}

export abstract class IUpdateRowValueHandler implements BaseHandler {
  abstract execute({ newValue, row, field, tableSettings, options }: UpdateRowValueCommand): void
}
