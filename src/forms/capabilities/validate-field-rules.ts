import type { BaseCommand } from '@/common/bus/axioma'
import type { NormalizedField, Rule, RuleOptions, RuleResult } from '@/forms/axioma'
import { UnprocessableValidationResult } from '@/forms/axioma'

type MinimumNormalizedField = Pick<NormalizedField, 'errors' | 'modelValue' | 'modelKey'> & { rules?: Rule }

export class ValidateFieldRulesCommand implements BaseCommand {
  public readonly meta = meta(ValidateFieldRulesHandler)

  constructor(
    public readonly field: MinimumNormalizedField,
    public readonly options?: RuleOptions,
  ) {}
}

export abstract class IValidateFieldRulesHandler {
  abstract execute(command: ValidateFieldRulesCommand): RuleResult
}

class ValidateFieldRulesHandler implements IValidateFieldRulesHandler {
  private setErrorsIfExist(field: MinimumNormalizedField, result: RuleResult, options?: RuleOptions) {
    if (result === true || options?.preventErrorMessage)
      return

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

    if (options?.processResult) {
      result = options.processResult(rawResult)
      result = this.isValidReturn(result, field.modelKey)
      this.setErrorsIfExist(field, result, options)

      return result
    }

    result = this.isValidReturn(rawResult, field.modelKey)
    this.setErrorsIfExist(field, result, options)

    return result
  }
}

injectable(IValidateFieldRulesHandler.name, ValidateFieldRulesHandler)
