import type { BaseObjectWithNormalizedFields, NormalizedSettings, NormalizedTitles, ObjectWithNormalizedButtons } from '../typing'

export interface FormState {
  originalNormalizedFields: BaseObjectWithNormalizedFields
  fields: BaseObjectWithNormalizedFields
  titles: NormalizedTitles
  settings: NormalizedSettings
  buttons: ObjectWithNormalizedButtons
}

export abstract class IFormStore {
  abstract save(id: symbol, payload: FormState): void
  abstract searchById(id: symbol): FormState | undefined
  abstract deleteById(id: symbol): void
}

export const formStore = new Map<symbol, FormState>()

