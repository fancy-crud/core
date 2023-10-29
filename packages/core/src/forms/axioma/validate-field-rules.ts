import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedField, Rule, RuleConfig, RuleResult } from '@packages/core/forms/axioma'

export type NormalizedFieldToValidate = Pick<NormalizedField, 'errors' | 'modelValue' | 'modelKey'> & { rules?: Rule }

export class ValidateFieldRulesCommand implements BaseCommand {
  public readonly meta = meta(IValidateFieldRulesHandler)

  constructor(
    public readonly field: NormalizedFieldToValidate,
    public readonly options?: RuleConfig,
  ) {}
}

export abstract class IValidateFieldRulesHandler {
  abstract execute(command: ValidateFieldRulesCommand): RuleResult
}
