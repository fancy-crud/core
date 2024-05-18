import { IFormStore, IRuleConfigStore } from '@fancy-crud/core'
import type { DefaultProps, NormalizedCheckboxField } from '@packages/vue/forms'
import { useRules } from '@packages/vue/forms'
import { useHintText, useModelValue, useOptions } from './utils'

export function useCheckboxField<T = any>(props: DefaultProps & { field: NormalizedCheckboxField & { modelValue: T } }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue<T>(props)

  const { validate } = useRules(fields, ruleConfigStore.searchById(props.formId))

  const isABooleanCheckbox = (
    !Array.isArray(props.field.options)
    && !props.field.multiple
    && !props.field.url
    && !props.field.optionLabel
    && !props.field.optionValue
  )

  const { options } = useOptions(props, isABooleanCheckbox)
  const { hintText, hasFieldErrors } = useHintText(props)

  const inRowDisplay = computed(() => {
    return props.field.inRow ? 'checkbox-group--row' : 'checkbox-group--column'
  })

  normalizeModelValue()
  onMounted(() => validate(props.field))

  function setModelValue(value: any) {
    modelValue.value = value
  }

  function normalizeModelValue() {
    const isArray = Array.isArray(modelValue.value)

    if (props.field.multiple && !isArray) {
      modelValue.value = [] as any
      return
    }

    if (!props.field.multiple && isArray)
      modelValue.value = null as any
  }

  return {
    setModelValue,
    modelValue,
    vmodel,
    inRowDisplay,
    options,
    hintText,
    hasFieldErrors,
  }
}
