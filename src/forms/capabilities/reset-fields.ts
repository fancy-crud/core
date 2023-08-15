import type { ObjectWithNormalizedFields } from 'src/forms/axioma'
import type { BaseCommand } from '@/common/bus/axioma'

type ObjectRecord = Record<string, unknown>

export class ResetFieldsCommand implements BaseCommand {
  public readonly meta = meta(ResetFieldsHandler)

  constructor(
    public readonly clonedFields: ObjectWithNormalizedFields<ObjectRecord>,
    public readonly originalFields: ObjectWithNormalizedFields<ObjectRecord>,
  ) {}
}

export abstract class IResetFieldsHandler {
  abstract execute(command: ResetFieldsCommand): void
}

class ResetFieldsHandler implements IResetFieldsHandler {
  /**
   * Resets the model value of fields in a normalized fields object to their original values.
   *
   * @typeparam T - A generic type parameter that extends `Record<string, NormalizedField>`.
   * @param clonedFields - A `NormalizedFields` object containing the fields whose model values need to be reset.
   * @param originalFields - A `NormalizedFields` object containing the original fields whose model values need to be used for resetting.
   */
  execute({ clonedFields, originalFields }: ResetFieldsCommand): void {
    Object.entries(originalFields).forEach(([fieldKey, field]) => {
      Object.assign(clonedFields[fieldKey], field)
    })
  }
}

injectable(IResetFieldsHandler.name, ResetFieldsHandler)
