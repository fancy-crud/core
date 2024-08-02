import type { ISetFieldsValuesHandler, NormalizedFieldToAssignValues, SetFieldsValuesCommand } from '../axioma'

export class SetFieldsValuesHandler implements ISetFieldsValuesHandler {
  private setFieldValue(field: NormalizedFieldToAssignValues, value: unknown): void {
    const isFile = ['file', 'image'].includes(field.type)
    if (!isFile)
      field.modelValue = value

    else {
      field.fileUrl = value ? String(value) : null
      field.modelValue = undefined
    }
  }

  execute({ fields, recordValues, settings }: SetFieldsValuesCommand): void {
    if (!Object.keys(recordValues).length)
      return

    Object.entries(fields).forEach(([_, field]) => {
      this.setFieldValue(field, field.recordValue(recordValues))
    })

    const recordValue = settings.lookupField ? recordValues[settings.lookupField] || '' : ''

    settings.lookupValue = String(recordValue)
  }
}

