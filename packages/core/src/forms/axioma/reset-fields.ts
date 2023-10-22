import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseObjectWithNormalizedFields } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'

type ObjectRecord = Record<string, unknown>

export class ResetFieldsCommand implements BaseCommand {
  public readonly meta = meta(IResetFieldsHandler)

  constructor(
    public readonly clonedFields: BaseObjectWithNormalizedFields<ObjectRecord>,
    public readonly originalFields: BaseObjectWithNormalizedFields<ObjectRecord>,
  ) {}
}

export abstract class IResetFieldsHandler {
  abstract execute(command: ResetFieldsCommand): void
}
