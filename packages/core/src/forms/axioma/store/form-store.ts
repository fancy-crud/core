import type { BaseObjectWithNormalizedFields, ButtonType, NormalizedButton, NormalizedSettings, RecordObject } from '../typing'

export interface FormState {
  id: symbol
  originalNormalizedFields: BaseObjectWithNormalizedFields
  fields: BaseObjectWithNormalizedFields
  settings: NormalizedSettings
  buttons: Record<ButtonType, NormalizedButton>
  record: RecordObject
}

export abstract class IFormStore {
  abstract save(id: symbol, payload: FormState): void
  abstract searchById(id: symbol): FormState | undefined
  abstract deleteById(id: symbol): void
}

export const formStore = new Map<symbol, FormState>()

