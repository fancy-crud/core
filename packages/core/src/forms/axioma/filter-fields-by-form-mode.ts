import { meta } from '@fancy-crud/bus'
import type { BaseCommand } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields, FormMode, NormalizedField } from '@packages/core/forms/axioma'
import { FORM_MODE, UnknownFormMode } from '@packages/core/forms/axioma'

export type FilterFieldsByFormModeCommandInput = Pick<NormalizedField, 'hidden' | 'createOnly' | 'updateOnly'>

export class FilterFieldsByFormModeCommand<T extends FilterFieldsByFormModeCommandInput> implements BaseCommand {
  public readonly meta = meta(IFilterFieldsByFormModeHandler)

  constructor(
    public readonly fields: BaseObjectWithNormalizedFields<T>,
    public readonly mode: FormMode,
  ) {
    if (mode !== FORM_MODE.create && mode !== FORM_MODE.update)
      throw new UnknownFormMode()
  }
}

export abstract class IFilterFieldsByFormModeHandler {
  abstract execute<T extends FilterFieldsByFormModeCommandInput = NormalizedField>({ mode, fields }: FilterFieldsByFormModeCommand<T>): [string, T][]
}
