import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedField, ObjectWithNormalizedFields } from '@packages/core/forms/axioma'

import { meta } from '@packages/core/common/bus/capabilities'

export type MinimumNormalizedField =
  Pick<NormalizedField, 'type' | 'modelValue' | 'errors' | 'modelKey'> & { optionValue?: string; multiple?: boolean }

export type JsonForm<T extends ObjectWithNormalizedFields<MinimumNormalizedField>> = { [K in keyof T]: T[K]['modelValue'] }

export interface GenerateFormDataOutput<T extends ObjectWithNormalizedFields<MinimumNormalizedField>> {
  formData: FormData | null
  jsonForm: JsonForm<T>
}

export class GenerateFormDataCommand<T extends ObjectWithNormalizedFields<MinimumNormalizedField> = ObjectWithNormalizedFields<MinimumNormalizedField>> implements BaseCommand {
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
  abstract execute<T extends ObjectWithNormalizedFields<MinimumNormalizedField>>({ fields }: GenerateFormDataCommand<T>): GenerateFormDataOutput<T>
}
