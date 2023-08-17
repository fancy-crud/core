import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { injectable, meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedField, NormalizedSettings, ObjectWithNormalizedFields } from '@packages/core/forms/axioma'

type RecordValues = Record<string, unknown>
type MinimumNormalizedField =
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> |
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> & { type: 'image' | 'file'; fileUrl: string | null }

export class SetFieldsValuesCommand implements BaseCommand {
  public readonly meta = meta(SetFieldsValuesHandler)

  constructor(
    public readonly fields: ObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly settings: Pick<NormalizedSettings, 'lookupField' | 'lookupValue'>,
    public readonly recordValues: RecordValues,
  ) {}
}

export abstract class ISetFieldsValuesHandler {
  abstract execute(command: SetFieldsValuesCommand): void
}

class SetFieldsValuesHandler implements ISetFieldsValuesHandler {
  private setFieldValue(field: MinimumNormalizedField, value: unknown): void {
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

injectable(ISetFieldsValuesHandler.name, SetFieldsValuesHandler)
