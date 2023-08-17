export type RuleResult = string | true

export interface RuleOptions {
  processResult?: (rawResult: any) => RuleResult
  preventErrorMessage?: boolean
}

export interface RuleOptionsState extends RuleOptions {}

export abstract class IRuleOptionsStore {
  abstract save(id: symbol, payload: RuleOptionsState): void
  abstract searchById(id: symbol): RuleOptionsState | undefined
  abstract deleteById(id: symbol): void
}

export const ruleOptionsStore = new Map<symbol, RuleOptionsState>()
