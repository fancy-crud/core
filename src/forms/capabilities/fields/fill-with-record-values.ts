import type { NormalizedField, NormalizedFields } from '@/forms/axioma'

type RecordValues = Record<string, unknown>

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export class FillWithRecordValues {
  /**
   * Sets the value of a normalized field.
   *
   * @param field The normalized field.
   * @param value The value to set.
   */
  private setFieldValue(field: NormalizedField, value: unknown): void {
    if (field.type !== 'file' && field.type !== 'image')
      field.modelValue = value

    else
      field.fileUrl = String(value)
  }

  /**
   * Fills the normalized fields with corresponding values from the record.
   *
   * @param normalizedFields The normalized fields of the form.
   * @param recordValues The values of the record.
   */
  execute<T extends Record<string, NormalizedField>>(normalizedFields: NormalizedFields<T>, recordValues: RecordValues): void {
    if (!Object.keys(recordValues).length)
      return

    Object.entries(normalizedFields).forEach(([_, field]) => {
      this.setFieldValue(field, field.recordValue(recordValues))
    })
  }
}
