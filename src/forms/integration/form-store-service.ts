import type { FormState } from '../axioma'
import { IFormStore, formStore } from '../axioma'

export class FormStoreService implements IFormStore {
  private assign<T extends {}>(target: T, source: FormState): asserts target is T & FormState {
    Object.assign(target, source)
  }

  save(id: symbol, payload: FormState): void {
    const state = this.searchById(id) || {}

    this.assign(state, payload)

    formStore.set(id, state)
  }

  searchById(id: symbol): FormState | undefined {
    return formStore.get(id)
  }

  deleteById(id: symbol): void {
    formStore.delete(id)
  }
}

injectable(IFormStore.name, FormStoreService)
