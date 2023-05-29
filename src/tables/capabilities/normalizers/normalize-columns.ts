import type { BaseFormField, ObjectWithNormalizedColumns, ObjectWithRawColumns } from '@/tables/axioma'

export class NormalizeColumns {
  execute(fields: BaseFormField, columns: ObjectWithRawColumns): ObjectWithNormalizedColumns {
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
