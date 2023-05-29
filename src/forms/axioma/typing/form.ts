import type { NormalizedButtons, ObjectWithNormalizedButtons } from './buttons'
import type { NormalizedSettings } from './settings'
import type { NormalizedTitles } from './titles'

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

export interface BaseRawField extends Record<string, any> {
  type: string | FieldType
  wrapper?: Record<string, unknown>
  class?: string
  label?: string
  errors?: string[]
  createOnly?: boolean
  updateOnly?: boolean
  hidden?: boolean
  hintText?: string
  rules?: any
  bounceTime?: number
  modelKey?: string
  modelValue?: unknown
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

export interface File {
  name: string
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

export interface DefaultAttributes {
  name: string
  class: string
  modelKey: string
  modelValue: unknown
  ref: any
  errors: string[]
}

export type FieldNormalizer<T> = T & DefaultAttributes

export type NormalizedField = FieldNormalizer<RawField>

export type NormalizedTextField = FieldNormalizer<RawTextField>

export type NormalizedColorField = FieldNormalizer<RawColorField>

export type NormalizedPasswordField = FieldNormalizer<RawPasswordField>

export type NormalizedTextareaField = FieldNormalizer<RawTextareaField>

export type NormalizedRadioField = FieldNormalizer<RawRadioField>

export type NormalizedCheckboxField = FieldNormalizer<RawCheckboxField>

export type NormalizedSelectField = FieldNormalizer<RawSelectField>

export type NormalizedFileField = FieldNormalizer<RawFileField>

export type NormalizedDatepickerField = FieldNormalizer<RawDatepickerField>

export type NormalizedFields<T> = { [K in keyof T]: NormalizedField & T[K] }

export interface Form<T, U> {
  originalNormalizedFields: NormalizedFields<T>
  clonedNormalizedFields: NormalizedFields<T>
  normalizedButtons: NormalizedButtons<U>
  normalizedTitles: NormalizedTitles
  normalizedSettings: NormalizedSettings
}

export interface ObjectWithRawFields extends Record<string, RawField> {}
export interface ObjectWithNormalizedFields extends Record<string, NormalizedField> {}
export interface FieldErrors extends Record<string, string[]> {}

export enum NotificationType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
  default = 'default',
}

export interface Notification {
  type: NotificationType
  message?: string
  data?: any
}

export interface NotificationMap extends Partial<Record<NotificationType, (notification?: Notification) => void>> {}

export type Handler = (response: any) => void
export interface ResponseMap extends Record<number, Handler> {}

export interface FormMap {
  originalNormalizedFields: ObjectWithNormalizedFields
  fields: ObjectWithNormalizedFields
  titles: NormalizedTitles
  settings: NormalizedSettings
  buttons: ObjectWithNormalizedButtons
}

export interface ResponseManager {
  removeResponseHandlers: () => void
  setResponseHandler: (codes: ResponseMap) => void
  getResponseHandler: (code: number) => Handler | null
}

export interface NotificationManager {
  setNotificationHandler: (handler: NotificationMap) => void
  pushNotification: (notification: Notification) => void
  removeNotificationHandlers: () => void
}

export interface FormManager {
  readonly responseManager: ResponseManager
  readonly notificationManager: NotificationManager
  fillWithRecordValues: (record: Record<string, unknown>) => void
  getForeignKeyValues: (fields?: ObjectWithNormalizedFields) => void
  resetFields: () => void
  removeForm: () => void
  addForm: (form: FormMap) => void
  getFormData: (fields?: ObjectWithNormalizedFields) => { jsonForm: Record<string, unknown>; formData: FormData | null }
  getForm: () => FormMap
  setErrors: (errors: FieldErrors) => void
  switchToCreateMode: () => void
  switchToUpdateMode: () => void
}
