import { IFormStore, IRuleOptionsStore } from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'
import type { DefaultProps, NormalizedFileField } from '@packages/vue/forms'
import { useHintText, useModelValue } from './utils'

export function useFileField(props: DefaultProps & { field: NormalizedFileField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleOptionsStore.searchById(props.formId))

  const { hintText, hasFieldErrors } = useHintText(props)

  const fileNames = computed(() => {
    if (Array.isArray(modelValue.value))
      return modelValue.value.map(file => file.name)

    if (modelValue.value)
      return [modelValue.value.name]

    return []
  })

  onMounted(() => validate(props.field))

  return {
    validate,
    modelValue,
    vmodel,
    hasFieldErrors,
    hintText,
    fileNames,
  }
}
