import type { ObjectWithNormalizedFields } from 'src/forms/axioma'

type ObjectRecord = Record<string, unknown>

export class ResetFieldsCommand {
  constructor(
    public readonly clonedFields: ObjectWithNormalizedFields<ObjectRecord>,
    public readonly originalFields: ObjectWithNormalizedFields<ObjectRecord>,
  ) {}
}

/**
 * A class that provides functionality to reset the model value of fields in a normalized fields object.
 */
export class ResetFieldsHandler {
  /**
   * Resets the model value of fields in a normalized fields object to their original values.
   *
   * @typeparam T - A generic type parameter that extends `Record<string, NormalizedField>`.
   * @param clonedFields - A `NormalizedFields` object containing the fields whose model values need to be reset.
   * @param originalFields - A `NormalizedFields` object containing the original fields whose model values need to be used for resetting.
   */
  execute({ clonedFields, originalFields }: ResetFieldsCommand): void {
    Object.entries(originalFields).forEach(([fieldKey, field]) => {
      Object.assign(clonedFields[fieldKey], field)
    })
  }
}
