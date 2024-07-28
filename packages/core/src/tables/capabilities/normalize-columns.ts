import type { INormalizeColumnsHandler, NormalizeColumnsCommand, ObjectWithNormalizedColumns } from '@packages/core/tables/axioma'

export class NormalizeColumnsHandler implements INormalizeColumnsHandler {
  execute({ fields, columns }: NormalizeColumnsCommand): ObjectWithNormalizedColumns {
    const mappedColumns: ObjectWithNormalizedColumns = {}

    const mergeColumns = Object.assign({}, fields, columns)

    Object.keys(mergeColumns).forEach((columnName) => {
      const DEFAULT_COLUMN = { name: columnName, type: 'text', input: { isEnable: false } }
      const columnFromField = fields ? fields[columnName] ?? DEFAULT_COLUMN : DEFAULT_COLUMN
      const column = {
        ...columnFromField,
        ...(columns[columnName] || {}),
      }

      const label = column.label || ''
      const value = column.name || columnName

      const rawColumn = columns[columnName] ? columns[columnName] : {}

      const input = fields ? fields[columnName] ?? {} : {}

      mappedColumns[columnName] = {
        label,
        value,
        ...rawColumn,
        input: {
          isEnable: false,
          type: 'text',
          ...input,
          ...rawColumn.input,
        },
      }
    })

    return mappedColumns
  }
}
