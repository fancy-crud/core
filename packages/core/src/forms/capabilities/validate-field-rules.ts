import type { RuleConfig, RuleResult } from '@packages/core/forms/axioma'
import { UnprocessableValidationResult } from '@packages/core/forms/axioma'
import type { IValidateFieldRulesHandler, NormalizedFieldToValidate, ValidateFieldRulesCommand } from '../axioma'

export class ValidateFieldRulesHandler implements IValidateFieldRulesHandler {
  private setErrorsIfExist(field: NormalizedFieldToValidate, result: RuleResult, options?: RuleConfig) {
    if (result === true || options?.preventErrorMessage) {
      field.errors = []
      return
    }

    field.errors = [result]
  }

  private isValidReturn(result: unknown, fieldName: string): RuleResult {
    if (typeof result === 'string' || (typeof result === 'boolean' && result === true))
      return result

    throw new UnprocessableValidationResult(fieldName)
  }

  execute({ field, options }: ValidateFieldRulesCommand): RuleResult {
    if (!field.rules)
      return true

    let result: RuleResult
    const rawResult = field.rules(field.modelValue)

    if (options?.parser) {
      result = options.parser(rawResult)
      result = this.isValidReturn(result, field.modelKey)
      this.setErrorsIfExist(field, result, options)

      return result
    }

    result = this.isValidReturn(rawResult, field.modelKey)
    this.setErrorsIfExist(field, result, options)

    return result
  }
}
