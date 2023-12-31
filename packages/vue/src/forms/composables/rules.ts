import type { BaseObjectWithNormalizedFields, NormalizedField, RuleConfig } from '@fancy-crud/core'
import { Bus, ValidateFieldRulesCommand, ValidateFormCommand, rulesConfig } from '@fancy-crud/core'

export function useRules(fields: BaseObjectWithNormalizedFields, options: RuleConfig = {}) {
  const bus = new Bus()

  const isFormValid = computed((): boolean => {
    const validateFormCommand = new ValidateFormCommand(fields, {
      ...rulesConfig,
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
          ...rulesConfig,
          ...options,
        })
        bus.execute(validateFieldCommand)
      },
      { debounce: 400, maxWait: 5000 },
    )
  }

  return {
    validate,
    isFormValid,
  }
}
