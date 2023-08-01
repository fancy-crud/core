import type { Form, ObjectWithRawFields, RawButton, RawSetting, RawTitle } from '../axioma'
import { NormalizeTitlesCommand } from './normalizers/normalize-titles'
import { NormalizeButtonsHandler, NormalizeFormFieldsHandler, NormalizeSettingsHandler, NormalizeTitlesHandler } from './normalizers'
import { NormalizeSettingsCommand } from '@/forms/capabilities'

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
  execute<T extends ObjectWithRawFields, U extends RawSetting, V extends Record<'main' | 'aux', RawButton>>(formId: string, rawFields: T, rawTitles?: RawTitle, rawButtons?: V, rawSettings?: U): Form<T, V> {
    const id = Symbol(formId)

    const normalizeFieldsCommand = new NormalizeFormFieldsCommand(rawFields)
    const originalNormalizedFields = new NormalizeFormFieldsHandler().execute(normalizeFieldsCommand)
    const clonedNormalizedFields = new NormalizeFormFieldsHandler().execute(normalizeFieldsCommand)

    const normalizeSettingsCommand = new NormalizeSettingsCommand(rawSettings)
    const normalizedSettings = new NormalizeSettingsHandler().execute(normalizeSettingsCommand)

    const normalizeButtonsCommand = new NormalizeButtonsCommand(rawButtons)
    const normalizedButtons = new NormalizeButtonsHandler().execute(normalizeButtonsCommand)

    const normalizeTitlesCommand = new NormalizeTitlesCommand(rawTitles)
    const normalizedTitles = new NormalizeTitlesHandler().execute(normalizeTitlesCommand)

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
