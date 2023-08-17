import { inject, meta } from '@packages/core/common/bus/capabilities'
import { IFormStore } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { IResetFieldsHandler, ResetFieldsCommand } from './reset-fields'

export class ResetFieldsByFormIdCommand implements BaseCommand {
  public readonly meta = meta(ResetFieldsByFormIdHandler)

  constructor(
    public readonly formId: symbol,
  ) {}
}

class ResetFieldsByFormIdHandler {
  constructor(
    private resetFields: IResetFieldsHandler = inject(IResetFieldsHandler),
    private formStore: IFormStore = inject(IFormStore),
  ) {}

  /**
   * Resets the model value of fields in a normalized fields object to their original values.
   *
   * @typeparam T - A generic type parameter that extends `Record<string, NormalizedField>`.
   * @param clonedFields - A `NormalizedFields` object containing the fields whose model values need to be reset.
   * @param originalFields - A `NormalizedFields` object containing the original fields whose model values need to be used for resetting.
   */
  execute({ formId }: ResetFieldsByFormIdCommand): void {
    const form = this.formStore.searchById(formId)

    if (!form)
      return

    this.resetFields.execute(
      new ResetFieldsCommand(form.fields, form.originalNormalizedFields),
    )
  }
}
