import type { RuleOptions } from '@packages/core/forms/axioma'

export const ruleOptions: RuleOptions = {}

export function setRuleOptions(options: RuleOptions = {}) {
  Object.assign(ruleOptions, options)
}
