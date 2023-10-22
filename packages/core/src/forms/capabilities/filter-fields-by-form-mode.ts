import type { NormalizedField, BaseObjectWithNormalizedFields } from '@packages/core/forms/axioma'
import { FORM_MODE } from '@packages/core/forms/axioma'
import type { FilterFieldsByFormModeCommand, FilterFieldsByFormModeCommandInput, IFilterFieldsByFormModeHandler } from '../axioma'

export class FilterFieldsByFormModeHandler implements IFilterFieldsByFormModeHandler {
  private filter<T extends FilterFieldsByFormModeCommandInput>(fields: BaseObjectWithNormalizedFields<T>, omit: 'createOnly' | 'updateOnly') {
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
