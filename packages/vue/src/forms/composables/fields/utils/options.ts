type Options = unknown[][]

interface Props {
  field: {
    options?: any[]
    optionValue?: string
    optionLabel?: string
    label?: string
  }
}

export function useOptions(props: Props, isBoolean = false) {
  const options = computed(() => {
    let rawOptions = props.field.options || []
    let optionValue = props.field.optionValue ?? ''
    let optionLabel = props.field.optionLabel ?? ''

    if (isBoolean) {
      rawOptions = [
        { label: props.field.label ?? null, value: true },
      ]
      optionLabel = 'label'
      optionValue = 'value'
    }

    const normalizedOptions = rawOptions.reduce((previousValue: Options, currentValue: any): Options => {
      const value: unknown = currentValue[optionValue] || currentValue
      const label: unknown = currentValue[optionLabel] ?? currentValue

      return [...previousValue, [label, value]]
    }, [] as Options)

    return normalizedOptions
  })

  return { options }
}
