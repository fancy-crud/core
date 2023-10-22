import type { NormalizedField, BaseObjectWithNormalizedFields, RuleOptions } from '@fancy-crud/core'
import { Bus, ValidateFieldRulesCommand, ValidateFormCommand, ruleOptions } from '@fancy-crud/core'

export function useRules(fields: BaseObjectWithNormalizedFields, options: RuleOptions = {}) {
  const bus = new Bus()

  const isFormValid = computed((): boolean => {
    const validateFormCommand = new ValidateFormCommand(fields, {
      ...ruleOptions,
      ...options,
      preventErrorMessage: true,
    })

    return bus.execute(validateFormCommand)
  })

  function validate(field: NormalizedField) {
    watchDebounced(
      () => field.modelValue,
      () => {
        const validateFieldCommand = new ValidateFieldRulesCommand(field, {
          ...ruleOptions,
          ...options,
        })
        bus.execute(validateFieldCommand)
      },
      { debounce: 500, maxWait: 5000 },
    )
  }

  return {
    validate,
    isFormValid,
  }
}
