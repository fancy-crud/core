import type { GetColumnValueCommand, IGetColumnValueHandler } from '../axioma'

export class GetColumnValueHandler implements IGetColumnValueHandler {
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
