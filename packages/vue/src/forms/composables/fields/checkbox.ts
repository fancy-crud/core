import { IFormStore, IRuleConfigStore } from '@fancy-crud/core'
import type { DefaultProps, NormalizedCheckboxField } from '@packages/vue/forms'
import { useRules } from '@packages/vue/forms'
import { useHintText, useModelValue, useOptions } from './utils'

export function useCheckboxField(props: DefaultProps & { field: NormalizedCheckboxField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleConfigStore.searchById(props.formId))

  const { options } = useOptions(props)
  const { hintText, hasFieldErrors } = useHintText(props)

  const inRowDisplay = computed(() => {
    return props.field.inRow ? 'checkbox-group--in-row' : ''
  })

  normalizeModelValue()
  onMounted(() => validate(props.field))

  function setModelValue(value: any) {
    modelValue.value = value
  }

  function normalizeModelValue() {
    const isArray = Array.isArray(modelValue.value)

    if (props.field.multiple && !isArray) {
      modelValue.value = []
      return
    }

    if (!props.field.multiple && isArray)
      modelValue.value = null
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
