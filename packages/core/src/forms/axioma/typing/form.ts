import type { ConvertToNormalizedFormButtons } from './buttons'
import type { NormalizedSettings } from './settings'

export type RawRuleResult = string | true | unknown
export type Rule = (value?: any) => RawRuleResult

export interface StandardResponseStructure { data: any; status: number }
export interface StandardErrorResponseStructure { response: StandardResponseStructure }

export interface BaseRawField extends Record<string, any> {
  type: string
  wrapper?: Record<string, unknown>
  class?: string
  label?: string
  errors?: string[]
  createOnly?: boolean
  updateOnly?: boolean
  hidden?: boolean
  exclude?: boolean
  hintText?: string
  debounceTime?: number
  modelKey?: string
  modelValue?: unknown
  fileUrl?: string | null
  multiple?: boolean
  preview?: boolean
  rules?: Rule
  recordValue?: (value: any) => unknown
  interceptOptions?: (options: any[]) => unknown[]
  parseModelValue?: (value: any) => unknown
}

export interface DefaultAttributes {
  name: string
  class: string
  modelKey: string
  modelValue: unknown
  ref: any
  errors: string[]
  debounceTime: number
  recordValue: (value: any) => unknown
  interceptOptions: (options: any[]) => unknown[]
}

export type FieldNormalizer<T> = T & DefaultAttributes

export type NormalizedField = FieldNormalizer<BaseRawField>

export type NormalizedFields<T> = { [K in keyof T]: NormalizedField & T[K] }

export interface BaseObjectWithRawFields extends Record<string, BaseRawField> {}
export interface BaseObjectWithNormalizedFields<T = NormalizedField> extends Record<string, T> {}
export interface FieldErrors extends Record<string, string[]> {}

export interface Form<T, U> {
  id: symbol
  originalNormalizedFields: NormalizedFields<T>
  clonedNormalizedFields: NormalizedFields<T>
  normalizedButtons: ConvertToNormalizedFormButtons<U>
  normalizedSettings: NormalizedSettings
}
