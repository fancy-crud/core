import type {
  BaseRawField,
  Bus,
  FieldNormalizer,
  NormalizedButtons,
  NormalizedFields,
  NormalizedSettings,
  RuleConfig,
} from '@fancy-crud/core';

export interface UseForm<T, U, S> {
  id: symbol
  fields: NormalizedFields<T>
  buttons: NormalizedButtons<U>
  settings: S & NormalizedSettings
  bus: Bus
}

export interface Args<T, U, S> {
  fields: T
  id?: string
  buttons?: U
  settings?: S
  rulesConfig?: RuleConfig
}

export interface DefaultProps {
  formId: symbol
}

export enum FieldType {
  text = 'text',
  password = 'password',
  color = 'color',
  textarea = 'textarea',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
  file = 'file',
  datepicker = 'datepicker',
}

export interface RawTextField extends BaseRawField {
  type: FieldType.text
}

export interface RawPasswordField extends BaseRawField {
  type: FieldType.password
  showPassword?: boolean
}

export interface RawColorField extends BaseRawField {
  type: FieldType.color
}

export interface RawTextareaField extends BaseRawField {
  type: FieldType.textarea
}

export interface RawRadioField extends BaseRawField {
  type: FieldType.radio
  inRow?: boolean
  optionLabel?: string
  optionValue?: string
  options?: any[]
}

export interface RawCheckboxField extends BaseRawField {
  type: FieldType.checkbox
  inRow?: boolean
  optionLabel?: string
  optionValue?: string
  options?: any[]
  multiple?: boolean
}

export interface RawSelectField extends BaseRawField {
  type: FieldType.select
  clearable?: boolean
  multiple?: boolean
  optionLabel?: string
  optionValue?: string
  options?: any[]
  url?: string
  filterParams?: Record<string, unknown>
}

export interface RawFileField extends BaseRawField {
  type: FieldType.file
  fileUrl?: string
  modelValue: File | File[] | null
}

export interface RawDatepickerField extends BaseRawField {
  type: FieldType.datepicker
}

export type RawField =
  | BaseRawField
  | RawTextField
  | RawPasswordField
  | RawColorField
  | RawTextareaField
  | RawRadioField
  | RawCheckboxField
  | RawSelectField
  | RawFileField
  | RawDatepickerField

export type NormalizedTextField = FieldNormalizer<RawTextField>

export type NormalizedColorField = FieldNormalizer<RawColorField>

export type NormalizedPasswordField = FieldNormalizer<RawPasswordField>

export type NormalizedTextareaField = FieldNormalizer<RawTextareaField>

export type NormalizedRadioField = FieldNormalizer<RawRadioField>

export type NormalizedCheckboxField = FieldNormalizer<RawCheckboxField>

export type NormalizedSelectField = FieldNormalizer<RawSelectField>

export type NormalizedFileField = FieldNormalizer<RawFileField>

export type NormalizedDatepickerField = FieldNormalizer<RawDatepickerField>

export interface ObjectWithRawFields extends Record<string, RawField> {}
