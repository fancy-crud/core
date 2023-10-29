import type { RuleConfig } from '@packages/core/forms/axioma'

export const rulesConfig: RuleConfig = {}

export function setRuleConfig(config: RuleConfig = {}) {
  Object.assign(rulesConfig, config)
}
