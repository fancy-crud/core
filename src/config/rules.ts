import type { RuleOptions } from '@/forms/axioma'

export const ruleOptions: RuleOptions = {}

export function setRuleOptions(options: RuleOptions = {}) {
  Object.assign(ruleOptions, options)
}
