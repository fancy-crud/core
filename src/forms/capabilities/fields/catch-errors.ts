import type { FieldErrors, NormalizedField, ObjectWithNormalizedFields } from '@/forms/axioma'

type MinimumNormalizedField = Pick<NormalizedField, 'errors'>

export class CatchErrorsCommand {
  constructor(
    public readonly normalizedFields: ObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly errors: FieldErrors,
  ) {}
}

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export class CatchErrorsHandler {
  execute({ normalizedFields, errors }: CatchErrorsCommand): void {
    Object.entries(errors).forEach(([fieldName, messages]) => {
      const field = normalizedFields[fieldName]

      if (!field)
        return

      field.errors = messages
    })
  }
}
