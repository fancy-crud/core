import { reactive, watch, computed } from 'vue';
import { TableHeader, Table, NormalizedFields } from '@/types';
import { getRecords } from '@/composables'
import { utils as xUtils, writeFile as xWriteFile } from 'xlsx'

type FieldFn = (row: unknown, index: number) => unknown
type FormatFn = (value: unknown) => unknown

export function createHeaders(fields: NormalizedFields, key: "table" | "xlsx" = "table", excludes=true): TableHeader[] {
  return Object.entries(fields).reduce((accumulator: TableHeader[], [fieldKey, field]) => {
    let skip = excludes && field[key]?.exclude

    if (skip) return accumulator

    const label: string = field[key]?.label as string || field.label as string || field.modelKey || fieldKey
    const value = field[key]?.value as string || fieldKey
    const _field: FieldFn | undefined = field[key]?.field as FieldFn
    const format: FormatFn | undefined = field[key]?.format as FormatFn
    const allowCheckbox = field.type === 'checkbox' && field[key]?.allowCheckbox !== false
    const allowImagePreview = field.type === 'image' && field[key]?.allowImagePreview !== false

    const result: TableHeader[] = [...accumulator, { label, value, field: _field, format, allowCheckbox, allowImagePreview }]
    return result
  }, [] as TableHeader[])
}

export function useXLSX(table: Table) {
  const { fetchItems, list, loading } = getRecords({
    url: table.settings.url,
    initialFilterParams: table.settings.filterParams
  })

  const getValue = computed(() => (row: any, header: TableHeader, rowIndex: number) => {
    let value: any
    if (typeof row === 'object')
      value = row[header.value]
  
    if (header.field)
      value = header.field(row, rowIndex)
  
    if (header.format)
      value = header.format(value)
  
    return value
  })

  watch(() => list.items, generateFile)

  function generateFile() {
    const xlsxHeaders = createHeaders(table.form.fields, "xlsx")

    const items = list.items.map((item, itemIndex) => {
      const result: Record<string, unknown> = {}

      xlsxHeaders.forEach(header => {
        const value = getValue.value(item, header, itemIndex)
        result[header.label] = value
      })

      return result
    })

    const data = xUtils.json_to_sheet(items)
    const workbook = xUtils.book_new()
    const filename = 'export'
  
    xUtils.book_append_sheet(workbook, data, filename)
    xWriteFile(workbook, `${filename}.xlsx`)
  }

  return {
    fetchItems,
    list,
    loading
  }
}

export function useTable<T extends Table>(args: T): Table {
  const table = reactive({}) as T

  Object.assign(table, args)

  return table
}