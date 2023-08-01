import type { Form, ObjectWithRawFields, RawButton, RawSetting, RawTitle } from '../axioma'
import { NormalizeButtonsHandler, NormalizeFormFieldsHandler, NormalizeSettingsHandler, NormalizeTitlesHandler } from './normalizers'

FormManagerHandler.setManagerMap(new Map())
NotificationManagerHandler.setManagerMap(new Map())
ResponseManagerHandler.setManagerMap(new Map())
RuleOptionsManagerHandler.setManagerMap(new Map())

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
  execute<T extends ObjectWithRawFields, U extends RawSetting, V extends Record<string, RawButton>>(formId: string, rawFields: T, rawTitles?: RawTitle, rawButtons?: V, rawSettings?: U): Form<T, V> {
    const id = Symbol(formId)

    const originalNormalizedFields = new NormalizeFormFieldsHandler().execute(rawFields)
    const clonedNormalizedFields = structuredClone(originalNormalizedFields)

    const normalizedSettings = new NormalizeSettingsHandler().execute(rawSettings)

    const normalizedButtons = new NormalizeButtonsHandler().execute(rawButtons)

    const normalizedTitles = new NormalizeTitlesHandler().execute(rawTitles)

    const manager = new FormManagerHandler(id)

    manager.addForm({
      originalNormalizedFields,
      fields: clonedNormalizedFields,
      titles: normalizedTitles,
      settings: normalizedSettings,
      buttons: normalizedButtons,
    })

    return {
      id,
      originalNormalizedFields,
      clonedNormalizedFields,
      normalizedSettings,
      normalizedButtons,
      normalizedTitles,
      manager,
    }
  }
}
