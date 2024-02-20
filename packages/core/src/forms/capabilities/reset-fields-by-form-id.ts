import { inject } from '@fancy-crud/bus'
import type { ResetFieldsByFormIdCommand } from '../axioma'
import { IFormStore, IResetFieldsHandler, ResetFieldsCommand } from '../axioma'

export class ResetFieldsByFormIdHandler {
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

