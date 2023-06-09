import type { NormalizedSelectField } from '@fancy-crud/core'
import { FormManagerHandler } from '@fancy-crud/core'
import { useHintText, useModelValue, useOptions } from './utils'

export function useSelectField(props: { formId: symbol; field: NormalizedSelectField }) {
  const formManager = new FormManagerHandler(props.formId)
  const { fields } = formManager.getForm()
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, formManager.ruleOptions)

  const { hintText, hasFieldErrors } = useHintText(props)

  const { options } = useOptions(props)

  const attrs = computed(() => {
    const {
      type: _type,
      options: _options,
      wrapper: _wrapper,
      ...attrs
    } = props.field
    return attrs
  })

  onMounted(() => validate(props.field))

  return {
    validate,
    options,
    attrs,
    modelValue,
    vmodel,
    hasFieldErrors,
    hintText,
  }
}
