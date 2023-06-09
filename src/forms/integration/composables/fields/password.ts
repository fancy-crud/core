import type { NormalizedPasswordField } from '@fancy-crud/core'
import { FormManagerHandler } from '@fancy-crud/core'
import type { DefaultProps } from '../../typing'
import { useHintText, useModelValue } from './utils'

export function usePasswordField(props: DefaultProps & { field: NormalizedPasswordField }) {
  const formManager = new FormManagerHandler(props.formId)
  const { fields } = formManager.getForm()
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, formManager.ruleOptions)

  const { hintText, hasFieldErrors } = useHintText(props)

  onMounted(() => validate(props.field))

  return {
    validate,
    modelValue,
    vmodel,
    hasFieldErrors,
    hintText,
  }
}
