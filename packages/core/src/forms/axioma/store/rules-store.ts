export type RuleResult = string | true

export interface RuleConfig {
  parser?: (rawResult: any) => RuleResult
  preventErrorMessage?: boolean
}

export interface RuleConfigState extends RuleConfig {}

export abstract class IRuleConfigStore {
  abstract save(id: symbol, payload: RuleConfigState): void
  abstract searchById(id: symbol): RuleConfigState | undefined
  abstract deleteById(id: symbol): void
}

export const rulesConfigStore = new Map<symbol, RuleConfigState>()
