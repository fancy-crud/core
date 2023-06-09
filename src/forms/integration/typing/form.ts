import type { FormManager, NormalizedButtons, NormalizedFields, NormalizedSettings, NormalizedTitles, RawSetting, RawTitle, RuleOptions } from '@fancy-crud/core'

export interface UseForm<T, U> {
  id: symbol
  fields: NormalizedFields<T>
  buttons: NormalizedButtons<U>
  titles: NormalizedTitles
  settings: NormalizedSettings
  manager: FormManager
}

export interface Args<T, U> {
  fields: T
  id?: string
  titles?: RawTitle
  buttons?: U
  settings?: RawSetting
  ruleOptions?: RuleOptions
}

export interface DefaultProps {
  formId: symbol
}
