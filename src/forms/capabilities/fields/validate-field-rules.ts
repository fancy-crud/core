import type { NormalizedField, RuleOptions, RuleResult } from '@/forms/axioma'

export class ValidateFieldRules {
  private setPossibleErrors(field: NormalizedField, result: RuleResult, options?: RuleOptions) {
    if (result === true || options?.preventErrorMessage)
      return

    field.errors = [result]
  }

  private isValidReturn(result: unknown, errorMessage: string): RuleResult {
    if (typeof result === 'string' || (typeof result === 'boolean' && result === true))
      return result

    throw new Error(errorMessage)
  }

  execute(field: NormalizedField, options?: RuleOptions): RuleResult {
    if (!field.rules)
      return true

    const errorMessage = `Unable to validate the field ${field.name}, rules function needs to return string or true. Otherwise you will need to process the initial return`
    let result: RuleResult
    const rawResult = field.rules(field.modelValue)

    if (options?.processResult) {
      result = options.processResult(rawResult)
      result = this.isValidReturn(result, errorMessage)
      this.setPossibleErrors(field, result, options)

      return result
    }

    result = this.isValidReturn(rawResult, errorMessage)
    this.setPossibleErrors(field, result, options)
    return result
  }
}
