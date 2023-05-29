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
   * Recursively traverses the record value object until the value corresponding to
   * the normalized field key is found and sets it.
   *
   * @param record The record value object.
   * @param fieldKey The normalized field key.
   * @param field The normalized field.
   */
  private traverseRecord(record: RecordValues, fieldKey: string, field: NormalizedField): void {
    const keys = fieldKey.split('.')
    const currentKey = keys.shift()
    if (!currentKey) {
      this.setFieldValue(field, record)
      return
    }

    const currentValue = record[currentKey]
    if (typeof currentValue === 'undefined')
      throw new Error(`Invalid field key: ${fieldKey}`)

    if (keys.length > 0)
      this.traverseRecord(currentValue as RecordValues, keys.join('.'), field)

    else
      this.setFieldValue(field, currentValue)
  }

  /**
   * Fills the normalized fields with corresponding values from the record.
   *
   * @param normalizedFields The normalized fields of the form.
   * @param recordValues The values of the record.
   */
  execute<T extends Record<string, NormalizedField>>(normalizedFields: NormalizedFields<T>, recordValues: RecordValues): void {
    if (Object.keys(recordValues).length === 0)
      return

    Object.entries(normalizedFields).forEach(([fieldKey, field]) => {
      this.traverseRecord(recordValues, fieldKey, field)
    })
  }
}
