import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import type { NormalizedPasswordField } from '@packages/vue'
import type { DefaultProps } from '../../typing'
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
