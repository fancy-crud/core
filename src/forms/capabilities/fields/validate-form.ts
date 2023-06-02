import type { ValidateFieldRules } from './validate-field-rules'
import type { ObjectWithNormalizedFields, RuleOptions } from '@/forms/axioma'

export class ValidateForm {
  constructor(private validateField: ValidateFieldRules) {}

  execute(fields: ObjectWithNormalizedFields, options?: RuleOptions) {
    const isValid = Object.values(fields).every((field) => {
      const result = this.validateField.execute(field, options)
      return result === true
    })

    return isValid
  }
}
