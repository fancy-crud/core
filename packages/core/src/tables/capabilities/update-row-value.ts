import type { NormalizedTableSettings, Row } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { RetrieveRequestOptions } from '@packages/core/common/http/axioma'
import { IRequestUpdateHandler, RequestUpdateCommand } from '@packages/core/common/http/capabilities'
import { inject, meta } from '@packages/core/common/bus/capabilities'

export class UpdateRowValueCommand<T extends Row = Row> implements BaseCommand {
  public readonly meta = meta(UpdateRowValueHandler)

  constructor(
    public readonly newValue: unknown,
    public readonly row: T,
    public readonly field: keyof T,
    public readonly tableSettings: NormalizedTableSettings,
    public readonly options?: RetrieveRequestOptions,
  ) {}
}

class UpdateRowValueHandler {
  constructor(
    private requestUpdate: IRequestUpdateHandler = inject(IRequestUpdateHandler),
  ) {}

  execute({ newValue, row, field, tableSettings, options }: UpdateRowValueCommand): void {
    const lookupField = tableSettings.lookupField
    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(row, lookupField))
      lookupValue = String(row[lookupField])

    const command = new RequestUpdateCommand(tableSettings.url, lookupValue, {
      [field]: newValue,
    }, options)

    this.requestUpdate.execute(command)
  }
}
