import { inject } from '@fancy-crud/bus'
import type { IValidateFormHandler, ValidateFormCommand } from '../axioma'
import { IValidateFieldRulesHandler, ValidateFieldRulesCommand } from '../axioma'

export class ValidateFormHandler implements IValidateFormHandler {
  constructor(
    private validateFieldRules: IValidateFieldRulesHandler = inject(IValidateFieldRulesHandler),
  ) {}

  execute({ fields, options }: ValidateFormCommand): boolean {
    const isValid = Object.values(fields).every((field) => {
      if (field.hidden || field.exclude)
        return true

      const command = new ValidateFieldRulesCommand(field, options)
      const result = this.validateFieldRules.execute(command)
      return result === true
    })

    return isValid
  }
}
