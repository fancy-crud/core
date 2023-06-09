interface Props<T = unknown> {
  field: {
    modelValue: T
  }
}

export function useModelValue<T = unknown>(props: Props<T>) {
  const modelValue = useVModel(props.field, 'modelValue', undefined, { passive: true })
  const vmodel = {
    'modelValue': modelValue.value,
    'onUpdate:modelValue': (e: T) => {
      modelValue.value = e
    },
  }

  watch(modelValue, (value) => {
    Object.assign(props.field, { modelValue: value })
  }, { deep: true })

  watch(() => props.field.modelValue, (value) => {
    if (value !== modelValue.value)
      modelValue.value = value
  })

  return {
    vmodel,
    modelValue,
  }
}
