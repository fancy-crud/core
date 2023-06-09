import type { NormalizedRadioField } from '@fancy-crud/core'
import { FormManagerHandler } from '@fancy-crud/core'
import type { DefaultProps } from '../../typing'
import { useHintText, useModelValue, useOptions } from './utils'

export function useRadioField(props: DefaultProps & { field: NormalizedRadioField }) {
  const formManager = new FormManagerHandler(props.formId)
  const { fields } = formManager.getForm()
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, formManager.ruleOptions)

  const { options } = useOptions(props)
  const { hintText, hasFieldErrors } = useHintText(props)

  const inRowDisplay = computed(() => {
    return props.field.inRow ? 'radio-group--in-row' : ''
  })

  onMounted(() => validate(props.field))

  function setModelValue(value: any) {
    modelValue.value = value
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
