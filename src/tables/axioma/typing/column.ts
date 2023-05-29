export interface RawColumn extends Record<string, unknown> {
  label?: string
  value?: string
  field?: (row: unknown, index: number) => unknown
  format?: (value: unknown) => unknown
  allowCheckbox?: boolean
  allowImagePreview?: boolean
  exclude?: boolean
}

export type FieldAsColumn<T, U> = { [K in keyof T]: U }

export type MappedRawColumn<T, U> = { [K in keyof (Extract<T, U>)]?: RawColumn }

export interface NormalizedColumn extends RawColumn {
  label: string
  value: string
}

export interface ObjectWithRawColumns extends Record<string, RawColumn> {}

export interface ObjectWithNormalizedColumns extends Record<string, NormalizedColumn> {}

export interface BaseFormField extends Record<string, {
  type: string
  label?: string
  name?: string
}> {}

export interface BaseTableForm {
  id: symbol
  fields: BaseFormField
}

