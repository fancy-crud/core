import type { ISetFieldsValuesHandler, NormalizedFieldToAssignValues, SetFieldsValuesCommand } from '../axioma'

export class SetFieldsValuesHandler implements ISetFieldsValuesHandler {
  private setFieldValue(field: NormalizedFieldToAssignValues, value: unknown): void {
    if (field.type !== 'file' && field.type !== 'image')
      field.modelValue = value

    else
      field.fileUrl = String(value)
  }

  execute({ fields, recordValues, settings }: SetFieldsValuesCommand): void {
    if (!Object.keys(recordValues).length)
      return

    Object.entries(fields).forEach(([_, field]) => {
      this.setFieldValue(field, field.recordValue(recordValues))
    })

    settings.lookupValue = String(recordValues[settings.lookupField] || '')
  }
}

