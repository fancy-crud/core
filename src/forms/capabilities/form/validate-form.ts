import { ValidateFieldRulesCommand, type ValidateFieldRulesHandler } from '../fields/validate-field-rules'
import type { NormalizedField, ObjectWithNormalizedFields, RuleOptions } from '@/forms/axioma'

type MinimumNormalizedField = Pick<NormalizedField, 'rules' | 'errors' | 'modelValue' | 'modelKey'>

export class ValidateFormCommand {
  constructor(
    public readonly fields: ObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly options?: RuleOptions,
  ) {}
}

export class ValidateFormHandler {
  constructor(private validateField: ValidateFieldRulesHandler) {}

  execute({ fields, options }: ValidateFormCommand) {
    const isValid = Object.values(fields).every((field) => {
      const command = new ValidateFieldRulesCommand(field, options)

      const result = this.validateField.execute(command)
      return result === true
    })

    return isValid
  }
}
