import type { BaseCommand } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields, NormalizedField } from '@packages/core/forms/axioma'

import { meta } from '@fancy-crud/bus'

export type MinimumNormalizedField =
  Pick<NormalizedField, 'type' | 'modelValue' | 'errors' | 'modelKey' | 'parseModelValue'> & { optionValue?: string; multiple?: boolean }

export type JsonForm<T extends BaseObjectWithNormalizedFields<MinimumNormalizedField>> = { [K in keyof T]: T[K]['modelValue'] }

export interface GenerateFormDataOutput<T extends BaseObjectWithNormalizedFields<MinimumNormalizedField>> {
  formData: FormData | null
  jsonForm: JsonForm<T>
}

export class GenerateFormDataCommand<T extends BaseObjectWithNormalizedFields<MinimumNormalizedField> = BaseObjectWithNormalizedFields<MinimumNormalizedField>> implements BaseCommand {
  public readonly meta = meta(IGenerateFormDataHandler)

  constructor(
    public readonly fields: T,
  ) {}
}

/**
 * Class responsible for generating form data in the appropriate format.
 */
export abstract class IGenerateFormDataHandler {
  /**
   * Generates the form data in the appropriate format.
   *
   * @param fields The normalized form fields.
   * @returns An object containing the form data in the appropriate format.
   */
  abstract execute<T extends BaseObjectWithNormalizedFields<MinimumNormalizedField>>({ fields }: GenerateFormDataCommand<T>): GenerateFormDataOutput<T>
}
