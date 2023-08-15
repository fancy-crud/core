import type { NormalizedTableSettings, Row } from '@/tables/axioma'
import type { BaseCommand } from '@/common/bus/axioma'
import type { RetrieveRequestOptions } from '@/common/http/axioma'
import { IRequestUpdateHandler } from '@/common/http/capabilities'

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
