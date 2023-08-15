import type { BaseCommand } from '@/common/bus/axioma'
import type { FormMode, NormalizedField, ObjectWithNormalizedFields } from '@/forms/axioma'
import { UnknownFormMode } from '@/forms/axioma'

export type FilterFieldsByFormModeCommandInput = Pick<NormalizedField, 'hidden' | 'createOnly' | 'updateOnly'>

export class FilterFieldsByFormModeCommand<T extends FilterFieldsByFormModeCommandInput> implements BaseCommand {
  public readonly meta = meta(FilterFieldsByFormModeHandler)

  constructor(
    public readonly fields: ObjectWithNormalizedFields<T>,
    public readonly mode: FormMode,
  ) {
    if (mode !== FORM_MODE.create && mode !== FORM_MODE.update)
      throw new UnknownFormMode()
  }
}

class FilterFieldsByFormModeHandler {
  private filter<T extends FilterFieldsByFormModeCommandInput>(fields: ObjectWithNormalizedFields<T>, omit: 'createOnly' | 'updateOnly') {
    const filteredFields = Object.entries(fields).filter(([_, field]) => {
      if (field.hidden)
        return false

      if (field[omit])
        return false

      return true
    })

    return filteredFields
  }

  execute<T extends FilterFieldsByFormModeCommandInput = NormalizedField>({ mode, fields }: FilterFieldsByFormModeCommand<T>): [string, T][] {
    return {
      [FORM_MODE.create]: () => this.filter(fields, 'updateOnly'),
      [FORM_MODE.update]: () => this.filter(fields, 'createOnly'),
    }[mode]()
  }
}
