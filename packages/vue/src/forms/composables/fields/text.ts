import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import type { NormalizedTextField } from '@packages/vue/forms'
import { useHintText, useModelValue } from './utils'

export function useTextField(props: { formId: symbol; field: NormalizedTextField }) {
  const formStore: IFormStore = vueInject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = vueInject(IRuleOptionsStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleOptionsStore.searchById(props.formId))

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
