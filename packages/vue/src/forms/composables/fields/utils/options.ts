type Options = unknown[][]

interface Props {
  field: {
    options?: any[]
    optionValue?: string
    optionLabel?: string
    label?: string
  }
}

export function useOptions(props: Props, isBoolean: boolean) {
  const options = computed(() => {
    let options = props.field.options || []
    let defaultOptionValue = ''
    let defaultOptionLabel = ''

    if (isBoolean) {
      options = [
        { label: props.field.label, value: true },
      ]
      defaultOptionLabel = 'label'
      defaultOptionValue = 'value'
    }

    const optionValue = props.field.optionValue || defaultOptionValue
    const optionLabel = props.field.optionLabel || defaultOptionLabel

    return options.reduce((previousValue: Options, currentValue: any): Options => {
      const value: unknown = currentValue[optionValue] || currentValue
      const label: unknown = currentValue[optionLabel] || currentValue

      return [...previousValue, [label, value]]
    }, [] as Options)
  })

  return { options }
}
