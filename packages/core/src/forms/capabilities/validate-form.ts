import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedField, ObjectWithNormalizedFields, RuleOptions } from '@packages/core/forms/axioma'
import { inject, meta } from '@packages/core/common/bus/capabilities'
import { IValidateFieldRulesHandler, ValidateFieldRulesCommand } from './validate-field-rules'

type MinimumNormalizedField = Pick<NormalizedField, 'rules' | 'errors' | 'modelValue' | 'modelKey'>

export class ValidateFormCommand implements BaseCommand {
  public readonly meta = meta(ValidateFormHandler)

  constructor(
    public readonly fields: ObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly options?: RuleOptions,
  ) {}
}

class ValidateFormHandler {
  constructor(private validateFieldRules: IValidateFieldRulesHandler = inject(IValidateFieldRulesHandler)) {}

  execute({ fields, options }: ValidateFormCommand): boolean {
    const isValid = Object.values(fields).every((field) => {
      const command = new ValidateFieldRulesCommand(field, options)

      const result = this.validateFieldRules.execute(command)
      return result === true
    })

    return isValid
  }
}
