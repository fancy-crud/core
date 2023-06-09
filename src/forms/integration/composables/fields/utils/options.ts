type Options = unknown[][]

interface Props {
  field: {
    options?: any[]
    optionValue?: string
    optionLabel?: string
  }
}

export function useOptions(props: Props) {
  const options = computed(() => {
    const options = props.field.options || []

    const optionValue = props.field.optionValue || ''
    const optionLabel = props.field.optionLabel || ''

    return options.reduce((previousValue: Options, currentValue: any): Options => {
      const value: unknown = currentValue[optionValue] || currentValue
      const label: unknown = currentValue[optionLabel] || currentValue

      return [...previousValue, [label, value]]
    }, [] as Options)
  })

  return { options }
}
