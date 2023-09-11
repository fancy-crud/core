import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { FieldErrors, NormalizedField, ObjectWithNormalizedFields } from '@packages/core/forms/axioma'

type MinimumNormalizedField = Pick<NormalizedField, 'errors'>

export class SetFieldsErrorsCommand implements BaseCommand {
  public readonly meta = meta(ISetFieldsErrorsHandler)

  constructor(
    public readonly normalizedFields: ObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly errors: FieldErrors,
  ) {}
}

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export abstract class ISetFieldsErrorsHandler {
  abstract execute({ normalizedFields, errors }: SetFieldsErrorsCommand): void
}
