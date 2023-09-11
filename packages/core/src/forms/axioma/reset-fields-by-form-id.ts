import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'

export class ResetFieldsByFormIdCommand implements BaseCommand {
  public readonly meta = meta(IResetFieldsByFormIdHandler)

  constructor(
    public readonly formId: symbol,
  ) {}
}

export abstract class IResetFieldsByFormIdHandler {
  /**
   * Resets the model value of fields in a normalized fields object to their original values.
   *
   * @typeparam T - A generic type parameter that extends `Record<string, NormalizedField>`.
   * @param clonedFields - A `NormalizedFields` object containing the fields whose model values need to be reset.
   * @param originalFields - A `NormalizedFields` object containing the original fields whose model values need to be used for resetting.
   */
  abstract execute({ formId }: ResetFieldsByFormIdCommand): void
}