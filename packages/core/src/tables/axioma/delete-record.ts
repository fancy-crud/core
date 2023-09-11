import type { DeleteRecordOptions, NormalizedTableSettings, Row } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class DeleteRecordCommand implements BaseCommand {
  public readonly meta = meta(IDeleteRecordHandler)

  constructor(
    public readonly row: Row | null,
    public readonly tableSettings: NormalizedTableSettings,
    public readonly options?: DeleteRecordOptions,
  ) {}
}

export abstract class IDeleteRecordHandler {
  abstract execute({ row, options, tableSettings }: DeleteRecordCommand): void
}
