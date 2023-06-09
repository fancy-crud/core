import type { RuleOptions } from '@/forms/core'

export const ruleOptions: RuleOptions = {}

export function setRuleOptions(options: RuleOptions = {}) {
  Object.assign(ruleOptions, options)
}
