import type { NormalizedField, NormalizedSettings, ObjectWithNormalizedFields } from '@/forms/axioma'

type RecordValues = Record<string, unknown>
type MinimumNormalizedField =
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> |
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> & { type: 'image' | 'file'; fileUrl: string | null }

export class FillWithRecordValuesCommand {
  constructor(
    public readonly fields: ObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly settings: Pick<NormalizedSettings, 'lookupField' | 'lookupValue'>,
    public readonly recordValues: RecordValues,
  ) {}
}

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export class FillWithRecordValuesHandler {
  /**
   * Sets the value of a normalized field.
   *
   * @param field The normalized field.
   * @param value The value to set.
   */
  private setFieldValue(field: MinimumNormalizedField, value: unknown): void {
    if (field.type !== 'file' && field.type !== 'image')
      field.modelValue = value

    else
      field.fileUrl = String(value)
  }

  /**
   * Fills the normalized fields with corresponding values from the record.
   *
   * @param fields The normalized fields of the form.
   * @param recordValues The values of the record.
   */
  execute({ fields, recordValues, settings }: FillWithRecordValuesCommand): void {
    if (!Object.keys(recordValues).length)
      return

    Object.entries(fields).forEach(([_, field]) => {
      this.setFieldValue(field, field.recordValue(recordValues))
    })

    settings.lookupValue = String(recordValues[settings.lookupField] || '')
  }
}
