import type { FieldErrors, ObjectWithNormalizedFields } from '@/forms/axioma'

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export class HandleErrors {
  execute<T extends ObjectWithNormalizedFields>(normalizedFields: T, errors: FieldErrors): void {
    Object.entries(errors).forEach(([fieldName, messages]) => {
      const field = normalizedFields[fieldName]

      if (!field)
        return

      field.errors = messages
    })
  }
}
