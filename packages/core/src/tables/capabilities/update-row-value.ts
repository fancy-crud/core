import type { IUpdateRowValueHandler, UpdateRowValueCommand } from '@packages/core/tables/axioma'
import { IRequestUpdateHandler, RequestUpdateCommand } from '@packages/core/common/http/axioma'
import { inject } from '@fancy-crud/bus'

export class UpdateRowValueHandler implements IUpdateRowValueHandler {
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
