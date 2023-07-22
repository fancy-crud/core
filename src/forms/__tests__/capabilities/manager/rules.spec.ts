import { RuleOptionsManagerHandler } from '@/forms/capabilities'
import type { RuleOptions } from '@/forms/axioma'

describe('RuleOptionsManagerHandler', () => {
  let ruleOptionsManagerHandler: RuleOptionsManagerHandler
  const id = Symbol('ruleOptionsManagerHandler')

  beforeEach(() => {
    ruleOptionsManagerHandler = new RuleOptionsManagerHandler(id)
  })

  it('should set and get rule options correctly', () => {
    const ruleOptions1: RuleOptions = {
      processResult: rawResult => rawResult === 'valid' ? true : 'invalid',
      preventErrorMessage: true,
    }

    const ruleOptions2: RuleOptions = {
      processResult: rawResult => rawResult === 'valid' ? true : 'invalid',
    }

    ruleOptionsManagerHandler.setRuleOptions(ruleOptions1)

    expect(ruleOptionsManagerHandler.getRuleOptions()).toEqual(ruleOptions1)

    ruleOptionsManagerHandler.setRuleOptions(ruleOptions2)

    expect(ruleOptionsManagerHandler.getRuleOptions()).toEqual({
      ...ruleOptions2,
      preventErrorMessage: true,
    })
  })

  it('should return the correct rule options', () => {
    const ruleOptions: RuleOptions = {
      processResult: rawResult => rawResult === 'valid' ? true : 'invalid',
      preventErrorMessage: true,
    }

    ruleOptionsManagerHandler.setRuleOptions(ruleOptions)

    expect(ruleOptionsManagerHandler.getRuleOptions()).toEqual(ruleOptions)
  })

  it('should remove rule options correctly', () => {
    const ruleOptions: RuleOptions = {
      processResult: rawResult => rawResult === 'valid' ? true : 'invalid',
    }

    ruleOptionsManagerHandler.setRuleOptions(ruleOptions)
    ruleOptionsManagerHandler.removeRuleOptions()

    expect(ruleOptionsManagerHandler.getRuleOptions()).toEqual({})
  })
})
