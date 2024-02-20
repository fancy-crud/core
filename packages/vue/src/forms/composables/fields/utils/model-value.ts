import type { UnwrapRef } from 'vue'

interface Props<T> {
  field: {
    modelValue: T
    debounceTime: number
  }
}

export function useModelValue<T>(props: Props<T>) {
  const wait = ref<NodeJS.Timeout | null>(null)
  const modelValue = useVModel(props.field, 'modelValue', undefined, { passive: true })
  const vmodel = computed(() => ({
    'modelValue': modelValue.value,
    'onUpdate:modelValue': (value: UnwrapRef<T>) => {
      setValue(modelValue, { value })
    },
  }))

  watch(modelValue, (value) => {
    setValue(props.field, { modelValue: value })
  }, { deep: true })

  watch(() => props.field.modelValue, (value) => {
    if (value !== modelValue.value)
      setValue(modelValue, { value })
  })

  function setValue(target: any, source: any) {
    if (wait.value)
      clearTimeout(wait.value)

    wait.value = setTimeout(() => Object.assign(target, source), props.field.debounceTime)
  }

  return {
    vmodel,
    modelValue,
  }
}
