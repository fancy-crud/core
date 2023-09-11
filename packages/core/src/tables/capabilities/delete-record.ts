import { IRequestDeleteHandler, RequestDeleteCommand } from '@packages/core/common/http/axioma'
import { inject } from '@packages/core/common/bus/capabilities'
import type { DeleteRecordCommand, IDeleteRecordHandler } from '../axioma'

export class DeleteRecordHandler implements IDeleteRecordHandler {
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
