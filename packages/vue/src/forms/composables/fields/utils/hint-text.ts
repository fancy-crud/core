interface Props {
  field: {
    hintText?: string
    errors: string[]
  }
}

export function useHintText(props: Props) {
  const hintText = computed(() => {
    let result: string = props.field.hintText ? props.field.hintText : ''

    if (props.field.errors.length)
      result = props.field.errors[0]

    return result
  })

  const hasFieldErrors = computed(() => !!props.field.errors.length)

  return {
    hintText,
    hasFieldErrors,
  }
}
