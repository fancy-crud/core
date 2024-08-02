import type { BaseRawField } from '@packages/core/forms/axioma'

export interface RawColumnInput extends Partial<BaseRawField> {
  isEnable?: boolean
}

export interface NormalizedColumnInput extends RawColumnInput {
  type: string
  isEnable: boolean
}

export type RawColumn = Record<string, unknown> & {
  label?: string
  value?: string
  field?: (row: any, index: number) => any
  format?: (value: any) => any
  input?: RawColumnInput
  exclude?: boolean
}

export type FieldAsColumn<T, U> = { [K in keyof (Converter<T> & U)]: K extends keyof U ? NormalizedColumn & U[K] : NormalizedColumn }

export type Converter<T> = { [K in keyof T]: RawColumn }

export type MappedRawColumn<T, U> = { [K in keyof (Converter<T> & U)]?: K extends keyof U ? RawColumn & U[K] : RawColumn }

export type ConvertToNormalizedColumns<T extends BaseTableForm, U extends ObjectWithRawColumns> = FieldAsColumn<T['fields'], NormalizedColumn> & { [K in keyof U]: NormalizedColumn & U[K] & { input: U[K]['input'] } }

export interface NormalizedColumn extends RawColumn {
  label: string
  value: string
  input: NormalizedColumnInput
}

export interface ObjectWithRawColumns extends Record<string, RawColumn> {}

export type ObjectWithNormalizedColumns = Record<string, NormalizedColumn>

export interface BaseFormField extends Record<string, {
  type: string
  label?: string
  name?: string
}> {}

export interface BaseTableForm {
  id: symbol
  fields?: BaseFormField
  settings?: { url?: string; loading?: boolean }
}

