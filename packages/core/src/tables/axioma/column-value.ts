import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { NormalizedColumn } from '../axioma'

export class GetColumnValueCommand implements BaseCommand {
  public readonly meta = meta(IGetColumnValueHandler)

  constructor(
    public readonly row: any,
    public readonly column: NormalizedColumn,
    public readonly rowIndex: number,
  ) {}
}

export abstract class IGetColumnValueHandler {
  abstract execute({ row, column, rowIndex }: GetColumnValueCommand): unknown
}
