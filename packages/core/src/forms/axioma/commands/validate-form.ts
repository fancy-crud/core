import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields, NormalizedField, RuleConfig } from '@packages/core/forms/axioma'
import { meta } from '@fancy-crud/bus'

type MinimumNormalizedField = Pick<NormalizedField, 'rules' | 'errors' | 'modelValue' | 'modelKey' | 'hidden' | 'exclude'>

export class ValidateFormCommand implements BaseCommand {
  public readonly meta = meta(IValidateFormHandler)

  constructor(
    public readonly fields: BaseObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly options?: RuleConfig,
  ) {}
}

export abstract class IValidateFormHandler implements BaseHandler {
  abstract execute({ fields, options }: ValidateFormCommand): boolean
}
