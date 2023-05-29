import type { ObjectWithNormalizedFields } from '@/forms/axioma'

/**
 * A class that provides functionality to reset the model value of fields in a normalized fields object.
 */
export class ResetFields {
  /**
   * Resets the model value of fields in a normalized fields object to their original values.
   *
   * @typeparam T - A generic type parameter that extends `Record<string, NormalizedField>`.
   * @param clonedFields - A `NormalizedFields` object containing the fields whose model values need to be reset.
   * @param originalFields - A `NormalizedFields` object containing the original fields whose model values need to be used for resetting.
   */
  execute(clonedFields: ObjectWithNormalizedFields, originalFields: ObjectWithNormalizedFields) {
    Object.entries(originalFields).forEach(([fieldKey, field]) => {
      Object.assign(clonedFields[fieldKey], field)
    })
  }
}
