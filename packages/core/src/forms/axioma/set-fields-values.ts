import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedField, NormalizedSettings, ObjectWithNormalizedFields } from '@packages/core/forms/axioma'

export type RecordValues = Record<string, unknown>
export type NormalizedFieldToAssignValues =
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> |
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> & { type: 'image' | 'file'; fileUrl: string | null }

export class SetFieldsValuesCommand implements BaseCommand {
  public readonly meta = meta(ISetFieldsValuesHandler)

  constructor(
    public readonly fields: ObjectWithNormalizedFields<NormalizedFieldToAssignValues>,
    public readonly settings: Pick<NormalizedSettings, 'lookupField' | 'lookupValue'>,
    public readonly recordValues: RecordValues,
  ) {}
}

export abstract class ISetFieldsValuesHandler {
  abstract execute(command: SetFieldsValuesCommand): void
}
