import type { NormalizedColumn } from '../axioma'
import type { BaseCommand } from '@/common/bus/axioma'

export class GetColumnValueCommand implements BaseCommand {
  public readonly meta = meta(GetColumnValueHandler)

  constructor(
    public readonly row: any,
    public readonly column: NormalizedColumn,
    public readonly rowIndex: number,
  ) {}
}

class GetColumnValueHandler {
  execute({ row, column, rowIndex }: GetColumnValueCommand): unknown {
    let value: any
    if (typeof row === 'object')
      value = row[column.value]

    if (column.field)
      value = column.field(row, rowIndex)

    if (column.format)
      value = column.format(value)

    return value
  }
}
