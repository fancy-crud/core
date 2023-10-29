import { injectable } from '@packages/core/common/bus/capabilities'
import type { RuleConfigState } from '../axioma'
import { IRuleConfigStore, rulesConfigStore } from '../axioma'

export class ruleConfigStoreService implements IRuleConfigStore {
  private assign<T extends {}>(target: T, source: RuleConfigState): asserts target is T & RuleConfigState {
    Object.assign(target, source)
  }

  save(id: symbol, payload: RuleConfigState): void {
    const state = this.searchById(id) || {}

    this.assign(state, payload)

    rulesConfigStore.set(id, state)
  }

  searchById(id: symbol): RuleConfigState | undefined {
    return rulesConfigStore.get(id)
  }

  deleteById(id: symbol): void {
    rulesConfigStore.delete(id)
  }
}

injectable(IRuleConfigStore.name, ruleConfigStoreService)
