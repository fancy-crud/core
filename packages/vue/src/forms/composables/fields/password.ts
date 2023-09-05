import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms/composables'
import type { DefaultProps, NormalizedPasswordField } from '@packages/vue/forms'
import { useHintText, useModelValue } from './utils'

export function usePasswordField(props: DefaultProps & { field: NormalizedPasswordField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore.name)!

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
