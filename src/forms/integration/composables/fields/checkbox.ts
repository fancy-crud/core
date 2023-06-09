import type { NormalizedCheckboxField } from '@fancy-crud/core'
import { FormManagerHandler } from '@fancy-crud/core'
import { useHintText, useModelValue, useOptions } from './utils'
import type { DefaultProps } from '@/forms/integration'

export function useCheckboxField(props: DefaultProps & { field: NormalizedCheckboxField }) {
  const formManager = new FormManagerHandler(props.formId)
  const { fields } = formManager.getForm()
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, formManager.ruleOptions)

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
