import type { NormalizedField, RuleOptions, RuleResult } from '@/forms/axioma'

export class ValidateFieldRules {
  private setPossibleErrors(field: NormalizedField, result: RuleResult) {
    if (result === true)
      return

    field.errors = [result]
  }

  execute(field: NormalizedField, options?: RuleOptions): RuleResult {
    if (!field.rules)
      return true

    const rawResult = field.rules(field.modelValue)

    if (options?.processResult) {
      const result = options.processResult(rawResult)
      this.setPossibleErrors(field, result)

      return result
    }

    if (typeof rawResult === 'string' || (typeof rawResult === 'boolean' && rawResult === true)) {
      this.setPossibleErrors(field, rawResult)
      return rawResult
    }

    throw new Error(
      `Unable to validate the field ${field.name}, rules function needs to return string or true.
      Otherwise you will need to process the initial return`,
    )
  }
}
