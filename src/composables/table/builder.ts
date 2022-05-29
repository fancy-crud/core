import { TableHeader, Table, NormalizedFields } from '@/types';
import { reactive } from 'vue';

export function createHeaders(fields: NormalizedFields) {
  return Object.entries(fields).reduce((accumulator, [fieldKey, field]) => {
    if (field.table?.exclude) return accumulator

    const label = field.table?.label || field.label || field.modelKey || fieldKey
    const value = field.table?.value || fieldKey
    const _field = field.table?.field
    const format = field.table?.format
    const allowCheckbox = field.type === 'checkbox' && field.table?.allowCheckbox !== false
    const allowImagePreview = field.type === 'image' && field.table?.allowImagePreview !== false

    return [...accumulator, { label, value, field: _field, format, allowCheckbox, allowImagePreview }]
  }, [] as TableHeader[])
}

export function createTable(args: Table): Table {
  return reactive(args)
}