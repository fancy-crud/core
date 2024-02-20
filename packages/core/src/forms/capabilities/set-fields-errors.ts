import type { ISetFieldsErrorsHandler, SetFieldsErrorsCommand } from '../axioma'

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export class SetFieldsErrorsHandler implements ISetFieldsErrorsHandler {
  execute({ normalizedFields, errors }: SetFieldsErrorsCommand): void {
    Object.entries(errors).forEach(([fieldName, messages]) => {
      const field = normalizedFields[fieldName]

      if (!field)
        return

      field.errors = messages
    })
  }
}
