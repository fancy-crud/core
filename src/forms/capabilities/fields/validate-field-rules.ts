import type { NormalizedField, RuleOptions, RuleResult } from '@/forms/axioma'

type MinimumNormalizedField = Pick<NormalizedField, 'rules' | 'errors' | 'modelValue' | 'modelKey'>

export class ValidateFieldRulesCommand {
  constructor(
    public readonly field: MinimumNormalizedField,
    public readonly options?: RuleOptions,
  ) {}
}

export class ValidateFieldRulesHandler {
  private setErrorsIfExist(field: MinimumNormalizedField, result: RuleResult, options?: RuleOptions) {
    if (result === true || options?.preventErrorMessage)
      return

    field.errors = [result]
  }

  private isValidReturn(result: unknown, errorMessage: string): RuleResult {
    if (typeof result === 'string' || (typeof result === 'boolean' && result === true))
      return result

    throw new Error(errorMessage)
  }

  execute({ field, options }: ValidateFieldRulesCommand): RuleResult {
    if (!field.rules)
      return true

    const errorMessage = `Unable to validate the field ${field.modelKey}, rules function needs to return string or true. Otherwise you will need to process the initial return`
    let result: RuleResult
    const rawResult = field.rules(field.modelValue)

    if (options?.processResult) {
      result = options.processResult(rawResult)
      result = this.isValidReturn(result, errorMessage)
      this.setErrorsIfExist(field, result, options)

      return result
    }

    result = this.isValidReturn(rawResult, errorMessage)
    this.setErrorsIfExist(field, result, options)

    return result
  }
}
