import type { NormalizedColorField } from '@fancy-crud/core'
import { FormManagerHandler } from '@fancy-crud/core'
import { useHintText, useModelValue } from './utils'
import type { DefaultProps } from '@/forms/integration'

export function useColorField(props: DefaultProps & { field: NormalizedColorField }) {
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
