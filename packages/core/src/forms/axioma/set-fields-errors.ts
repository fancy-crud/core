import { meta } from '@fancy-crud/bus'
import type { BaseCommand } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields, FieldErrors, NormalizedField } from '@packages/core/forms/axioma'

type MinimumNormalizedField = Pick<NormalizedField, 'errors'>

export class SetFieldsErrorsCommand implements BaseCommand {
  public readonly meta = meta(ISetFieldsErrorsHandler)

  constructor(
    public readonly normalizedFields: BaseObjectWithNormalizedFields<MinimumNormalizedField>,
    public readonly errors: FieldErrors,
  ) {}
}

/**
 * Class that fills the normalized fields of a form with corresponding values from a record.
 */
export abstract class ISetFieldsErrorsHandler {
  abstract execute({ normalizedFields, errors }: SetFieldsErrorsCommand): void
}
