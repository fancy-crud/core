import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import type { NormalizedSelectField } from '@packages/vue'
import { useHintText, useModelValue, useOptions } from './utils'

export function useSelectField(props: { formId: symbol; field: NormalizedSelectField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleOptionsStore.searchById(props.formId))

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
