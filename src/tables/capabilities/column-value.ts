import type { NormalizedColumn } from '../axioma'

export function columnValue(row: any, header: NormalizedColumn, rowIndex: number) {
  let value: any
  if (typeof row === 'object')
    value = row[header.value]

  if (header.field)
    value = header.field(row, rowIndex)

  if (header.format)
    value = header.format(value)

  return value
}
