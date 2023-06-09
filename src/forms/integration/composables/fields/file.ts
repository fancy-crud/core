import type { NormalizedFileField } from '@fancy-crud/core'
import { FormManagerHandler } from '@fancy-crud/core'
import type { DefaultProps } from '../../typing'
import { useHintText, useModelValue } from './utils'

export function useFileField(props: DefaultProps & { field: NormalizedFileField }) {
  const formManager = new FormManagerHandler(props.formId)
  const { fields } = formManager.getForm()
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, formManager.ruleOptions)

  const { hintText, hasFieldErrors } = useHintText(props)

  const fileNames = computed(() => {
    if (Array.isArray(modelValue.value))
      return modelValue.value.map(file => file.name)

    if (modelValue.value)
      return [modelValue.value.name]

    return []
  })

  onMounted(() => validate(props.field))

  return {
    validate,
    modelValue,
    vmodel,
    hasFieldErrors,
    hintText,
    fileNames,
  }
}
