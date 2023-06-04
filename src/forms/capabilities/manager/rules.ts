import type { RuleOptions, RuleOptionsManager } from '@/forms/axioma'

const ruleOptions = new Map<symbol, RuleOptions>()

export class RuleOptionsManagerHandler implements RuleOptionsManager {
  constructor(private id: symbol) {}

  private getRuleOptionsFromMap() {
    if (!ruleOptions.get(this.id))
      ruleOptions.set(this.id, {})

    return ruleOptions.get(this.id)!
  }

  setRuleOptions(newRuleOptions: RuleOptions) {
    Object.assign(this.getRuleOptionsFromMap(), newRuleOptions)
  }

  getRuleOptions(): RuleOptions {
    return this.getRuleOptionsFromMap()
  }

  removeRuleOptions() {
    ruleOptions.delete(this.id)
  }
}
