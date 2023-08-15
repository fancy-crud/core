import type { NormalizedSettings, NormalizedTitles, ObjectWithNormalizedButtons, ObjectWithNormalizedFields } from '../typing'

export abstract class IFormStore {
  abstract save(id: symbol, payload: FormState): void
  abstract searchById(id: symbol): FormState | undefined
  abstract deleteById(id: symbol): void
}

export interface FormState {
  originalNormalizedFields: ObjectWithNormalizedFields
  fields: ObjectWithNormalizedFields
  titles: NormalizedTitles
  settings: NormalizedSettings
  buttons: ObjectWithNormalizedButtons
}

export const formStore = new Map<symbol, FormState>()

