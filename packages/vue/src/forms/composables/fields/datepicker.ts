import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import type { NormalizedDatepickerField } from '@packages/vue'
import type { DefaultProps } from '../../typing'
import { useHintText, useModelValue } from './utils'

export function useDatepickerField(props: DefaultProps & { field: NormalizedDatepickerField }) {
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
