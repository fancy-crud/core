import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields, NormalizedField, NormalizedSettings } from '@packages/core/forms/axioma'

export type RecordValues = Record<string, unknown>
export type NormalizedFieldToAssignValues =
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> |
  Pick<NormalizedField, 'type' | 'modelValue' | 'fileUrl' | 'recordValue'> & { type: 'image' | 'file'; fileUrl: string | null }

export class SetFieldsValuesCommand implements BaseCommand {
  public readonly meta = meta(ISetFieldsValuesHandler)

  constructor(
    public readonly fields: BaseObjectWithNormalizedFields<NormalizedFieldToAssignValues>,
    public readonly settings: Pick<NormalizedSettings, 'lookupField' | 'lookupValue'>,
    public readonly recordValues: RecordValues,
  ) {}
}

export abstract class ISetFieldsValuesHandler implements BaseHandler {
  abstract execute(command: SetFieldsValuesCommand): void
}
