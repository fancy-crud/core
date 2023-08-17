import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import type { NormalizedRadioField } from '@packages/vue'
import type { DefaultProps } from '../../typing'
import { useHintText, useModelValue, useOptions } from './utils'

export function useRadioField(props: DefaultProps & { field: NormalizedRadioField }) {
  const formStore: IFormStore = vueInject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = vueInject(IRuleOptionsStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleOptionsStore.searchById(props.formId))

  const { options } = useOptions(props)
  const { hintText, hasFieldErrors } = useHintText(props)

  const inRowDisplay = computed(() => {
    return props.field.inRow ? 'radio-group--in-row' : ''
  })

  onMounted(() => validate(props.field))

  function setModelValue(value: any) {
    modelValue.value = value
  }

  return {
    setModelValue,
    modelValue,
    vmodel,
    inRowDisplay,
    options,
    hintText,
    hasFieldErrors,
  }
}
