import type { DeleteRecordOptions, NormalizedTableSettings, Row } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { IRequestDeleteHandler, RequestDeleteCommand } from '@packages/core/common/http/capabilities'
import { inject, meta } from '@packages/core/common/bus/capabilities'

export class DeleteRecordCommand implements BaseCommand {
  public readonly meta = meta(DeleteRecordHandler)

  constructor(
    public readonly row: Row | null,
    public readonly tableSettings: NormalizedTableSettings,
    public readonly options?: DeleteRecordOptions,
  ) {}
}

class DeleteRecordHandler {
  constructor(
    private requestDelete: IRequestDeleteHandler = inject(IRequestDeleteHandler),
  ) {}

  execute({ row, options, tableSettings }: DeleteRecordCommand): void {
    if (!row)
      return

    if (options?.onRequestDeleteConfirmation && !tableSettings.skipDeleteConfirmation) {
      options.onRequestDeleteConfirmation(row)
      return
    }

    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(row, tableSettings.lookupField))
      lookupValue = String(row[tableSettings.lookupField])

    const command = new RequestDeleteCommand(tableSettings.url, lookupValue, options)
    this.requestDelete.execute(command)
  }
}
