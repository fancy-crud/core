import type { NormalizedButtons, ObjectWithNormalizedButtons } from './buttons'
import type { NormalizedSettings } from './settings'
import type { NormalizedTitles } from './titles'

export type RawRuleResult = string | true | unknown
export type RuleResult = string | true
export type Rule = (value?: any) => RawRuleResult

export interface RuleOptions {
  processResult?: (rawResult: any) => RuleResult
  preventErrorMessage?: boolean
}

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
  fileUrl?: string
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

export interface ObjectWithRawFields extends Record<string, BaseRawField> {}
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

export interface RuleOptionsManager {
  setRuleOptions(ruleOptions: RuleOptions): void
  getRuleOptions(): RuleOptions
  removeRuleOptions(): void
}

export interface FormManager {
  readonly responseManager: ResponseManager
  readonly notificationManager: NotificationManager
  readonly ruleOptionsManager: RuleOptionsManager
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
  isFormValid: () => boolean
  setRuleOptions(ruleOptions: RuleOptions): void
}

export interface Form<T, U> {
  id: symbol
  originalNormalizedFields: NormalizedFields<T>
  clonedNormalizedFields: NormalizedFields<T>
  normalizedButtons: NormalizedButtons<U>
  normalizedTitles: NormalizedTitles
  normalizedSettings: NormalizedSettings
  manager: FormManager
}

export interface ManagerMap<T> {
  get(key: symbol): T | undefined
  set(key: symbol, value: T): void
  delete(key: symbol): void
}
