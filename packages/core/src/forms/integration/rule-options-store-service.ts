import { injectable } from '@packages/core/common/bus/capabilities'
import type { RuleOptionsState } from '../axioma'
import { IRuleOptionsStore, ruleOptionsStore } from '../axioma'

export class RuleOptionsStoreService implements IRuleOptionsStore {
  private assign<T extends {}>(target: T, source: RuleOptionsState): asserts target is T & RuleOptionsState {
    Object.assign(target, source)
  }

  save(id: symbol, payload: RuleOptionsState): void {
    const state = this.searchById(id) || {}

    this.assign(state, payload)

    ruleOptionsStore.set(id, state)
  }

  searchById(id: symbol): RuleOptionsState | undefined {
    return ruleOptionsStore.get(id)
  }

  deleteById(id: symbol): void {
    ruleOptionsStore.delete(id)
  }
}

injectable(IRuleOptionsStore.name, RuleOptionsStoreService)
