import type { ManagerMap, RuleOptions, RuleOptionsManager } from '@/forms/axioma'

export class RuleOptionsManagerHandler implements RuleOptionsManager {
  private static map: ManagerMap<RuleOptions>

  constructor(private id: symbol) {}

  private getRuleOptionsFromMap() {
    if (!RuleOptionsManagerHandler.map.get(this.id))
      RuleOptionsManagerHandler.map.set(this.id, {})

    return RuleOptionsManagerHandler.map.get(this.id)!
  }

  static setManagerMap(managerMap: ManagerMap<RuleOptions>) {
    RuleOptionsManagerHandler.map = managerMap
  }

  setRuleOptions(newRuleOptions: RuleOptions) {
    Object.assign(this.getRuleOptionsFromMap(), newRuleOptions)
  }

  getRuleOptions(): RuleOptions {
    return this.getRuleOptionsFromMap()
  }

  removeRuleOptions() {
    RuleOptionsManagerHandler.map.delete(this.id)
  }
}
