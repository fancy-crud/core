import { FormManagerHandler } from '@fancy-crud/core'
import { useHintText, useModelValue, useOptions } from './utils'
import type { NormalizedSelectField } from '@/forms/integration'

export function useSelectField(props: { formId: symbol; field: NormalizedSelectField }) {
  const formManager = new FormManagerHandler(props.formId)
  const { fields } = formManager.getForm()
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, formManager.ruleOptions)

  const { hintText, hasFieldErrors } = useHintText(props)

  const { options } = useOptions(props)

  const attrs = computed(() => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type: _type,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      options: _options,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
