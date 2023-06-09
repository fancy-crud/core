import type { NormalizedField, ObjectWithNormalizedFields, RuleOptions } from '@fancy-crud/core'
import { ValidateFieldRules, ValidateForm, ruleOptions } from '@fancy-crud/core'

export function useRules(fields: ObjectWithNormalizedFields, options: RuleOptions = {}) {
  const isFormValid = computed(() => {
    const validateField = new ValidateFieldRules()
    const validateForm = new ValidateForm(validateField)

    return validateForm.execute(fields, {
      ...ruleOptions,
      ...options,
      preventErrorMessage: true,
    })
  })

  function validate(field: NormalizedField) {
    watchDebounced(
      () => field.modelValue,
      () => {
        const validateField = new ValidateFieldRules()
        validateField.execute(field, {
          ...ruleOptions,
          ...options,
        })
      },
      { debounce: 300, maxWait: 1000 },
    )
  }

  return {
    validate,
    isFormValid,
  }
}
