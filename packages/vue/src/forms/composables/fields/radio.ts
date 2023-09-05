import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms/composables'
import type { DefaultProps, NormalizedRadioField } from '@packages/vue/forms'
import { useHintText, useModelValue, useOptions } from './utils'

export function useRadioField(props: DefaultProps & { field: NormalizedRadioField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore.name)!

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
