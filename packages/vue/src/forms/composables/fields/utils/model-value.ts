import type { UnwrapRef } from 'vue'

interface Props<T> {
  field: {
    modelValue: T
  }
}

export function useModelValue<T>(props: Props<T>) {
  const modelValue = useVModel(props.field, 'modelValue', undefined, { passive: true })
  const vmodel = computed(() => ({
    'modelValue': modelValue.value,
    'onUpdate:modelValue': (e: UnwrapRef<T>) => {
      modelValue.value = e
    },
  }))

  watch(modelValue, (value) => {
    Object.assign(props.field, { modelValue: value })
  }, { deep: true })

  watch(() => props.field.modelValue, (value) => {
    if (value !== modelValue.value)
      modelValue.value = value as UnwrapRef<T>
  })

  return {
    vmodel,
    modelValue,
  }
}
