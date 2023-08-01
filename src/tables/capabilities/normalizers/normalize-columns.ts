import type { BaseFormField, ObjectWithNormalizedColumns, ObjectWithRawColumns } from '@/tables/axioma'

export type NormalizeColumnsCommandOutput = ObjectWithNormalizedColumns

export class NormalizeColumnsCommand {
  constructor(
    public readonly fields: BaseFormField,
    public readonly columns: ObjectWithRawColumns,
  ) {}
}

export class NormalizeColumnsHandler {
  execute({ fields, columns }: NormalizeColumnsCommand): NormalizeColumnsCommandOutput {
    const mappedColumns: ObjectWithNormalizedColumns = {}

    const mergeColumns = Object.assign({}, fields, columns)

    Object.keys(mergeColumns).forEach((columnName) => {
      const column = {
        ...(fields[columnName] || {}),
        ...(columns[columnName] || {}),
      }

      const label = column.label || ''
      const value = column.name || columnName

      const allowCheckbox = column.type === 'checkbox' && column?.allowCheckbox !== false
      const allowImagePreview = column.type === 'image' && column?.allowImagePreview !== false

      const rawColumn = columns[columnName] ? columns[columnName] : {}

      mappedColumns[columnName] = {
        label,
        value,
        allowCheckbox,
        allowImagePreview,
        ...rawColumn,
      }
    })

    return mappedColumns
  }
}
