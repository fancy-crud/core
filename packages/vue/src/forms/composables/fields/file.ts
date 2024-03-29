import { IFormStore, IRuleConfigStore } from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'
import type { DefaultProps, NormalizedFileField } from '@packages/vue/forms'
import { useHintText, useModelValue } from './utils'

export function useFileField(props: DefaultProps & { field: NormalizedFileField }) {
  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore.name)!

  const { fields } = formStore.searchById(props.formId)!
  const { modelValue, vmodel } = useModelValue(props)

  const { validate } = useRules(fields, ruleConfigStore.searchById(props.formId))

  const { hintText, hasFieldErrors } = useHintText(props)

  const fileNames = computed(() => {
    if (Array.isArray(modelValue.value))
      return modelValue.value.map(file => file.name)

    if (modelValue.value)
      return [modelValue.value.name]

    return []
  })

  const filesList = computed(() => {
    if (Array.isArray(modelValue.value))
      return modelValue.value

    if (modelValue.value)
      return [modelValue.value]

    return []
  })

  onMounted(() => validate(props.field))

  function onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement
    if (target && target.files) {
      const files = Array.from(target.files)
      if (props.field.multiple)
        vmodel.value['onUpdate:modelValue'](files)
      else
        vmodel.value['onUpdate:modelValue'](files[0])
    }
  }

  return {
    validate,
    onFileChanged,
    modelValue,
    vmodel,
    hasFieldErrors,
    hintText,
    fileNames,
    filesList,
  }
}
