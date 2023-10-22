import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedField, BaseObjectWithNormalizedFields, RuleOptions } from '@packages/core/forms/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

type MinimumNormalizedField = Pick<NormalizedField, 'rules' | 'errors' | 'modelValue' | 'modelKey'>

export class ValidateFormCommand implements BaseCommand {
  public readonly meta = meta(IValidateFormHandler)

  constructor(
    public readonly fields: BaseObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly options?: RuleOptions,
  ) {}
}

export abstract class IValidateFormHandler {
  abstract execute({ fields, options }: ValidateFormCommand): boolean
}
