import type { Form, ObjectWithRawFields, RawButton, RawSetting, RawTitle } from '../axioma'
import { NormalizeButtons, NormalizeFormFields, NormalizeSettings, NormalizeTitles } from './normalizers'

/**
 * A class that provides functionality to create a form from raw fields and settings.
 */
export class CreateForm {
  /**
   * Creates a form from raw fields and settings.
   *
   * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
   * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
   * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
   * @returns A `Form` object containing the normalized fields and settings.
   */
  execute<T extends ObjectWithRawFields, U extends RawSetting, V extends Record<string, RawButton>>(rawFields: T, rawTitles?: RawTitle, rawButtons?: V, rawSettings?: U): Form<T, V> {
    const originalNormalizedFields = new NormalizeFormFields().execute(rawFields)
    const clonedNormalizedFields = new NormalizeFormFields().execute(rawFields)

    const normalizedSettings = new NormalizeSettings().execute(rawSettings)

    const normalizedButtons = new NormalizeButtons().execute(rawButtons)

    const normalizedTitles = new NormalizeTitles().execute(rawTitles)

    return {
      originalNormalizedFields,
      clonedNormalizedFields,
      normalizedSettings,
      normalizedButtons,
      normalizedTitles,
    }
  }
}
