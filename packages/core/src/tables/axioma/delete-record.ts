import type { DeleteRecordOptions, NormalizedTableSettings, Row } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

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
