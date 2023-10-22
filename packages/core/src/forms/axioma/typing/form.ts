import type { NormalizedButtons } from './buttons'
import type { NormalizedSettings } from './settings'
import type { NormalizedTitles } from './titles'

export type RawRuleResult = string | true | unknown
export type Rule = (value?: any) => RawRuleResult

export interface BaseRawField extends Record<string, any> {
  type: string
  wrapper?: Record<string, unknown>
  class?: string
  label?: string
  errors?: string[]
  createOnly?: boolean
  updateOnly?: boolean
  hidden?: boolean
  hintText?: string
  bounceTime?: number
  modelKey?: string
  modelValue?: unknown
  fileUrl?: string | null
  multiple?: boolean
  rules?: Rule
  recordValue?: (value: any) => unknown
}

export interface DefaultAttributes {
  name: string
  class: string
  modelKey: string
  modelValue: unknown
  ref: any
  errors: string[]
  recordValue: (value: any) => unknown
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
  normalizedButtons: NormalizedButtons<U>
  normalizedTitles: NormalizedTitles
  normalizedSettings: NormalizedSettings
}
