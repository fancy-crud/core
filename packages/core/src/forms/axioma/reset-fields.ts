import { meta } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@fancy-crud/bus'

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
