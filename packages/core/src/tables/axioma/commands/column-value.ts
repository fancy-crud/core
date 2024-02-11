import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { NormalizedColumn } from '../typing'

export class GetColumnValueCommand implements BaseCommand {
  public readonly meta = meta(IGetColumnValueHandler)

  constructor(
    public readonly row: any,
    public readonly column: NormalizedColumn,
    public readonly rowIndex: number,
  ) {}
}

export abstract class IGetColumnValueHandler implements BaseHandler {
  abstract execute({ row, column, rowIndex }: GetColumnValueCommand): unknown
}
