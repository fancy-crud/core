import { IFormStore, IRuleConfigStore } from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'
import type { NormalizedSelectField } from '@packages/vue/forms'
import { useHintText, useModelValue, useOptions } from './utils'

export function useSelectField(props: { formId: symbol; field: NormalizedSelectField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleConfigStore.searchById(props.formId))

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
