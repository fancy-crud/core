import { Bus, inject, meta } from '@packages/core/common/bus/capabilities'
import { INotificationStore } from '@packages/core/common/notifications/axioma'
import { IResponseInterceptorStore } from '@packages/core/common/response-interceptor/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import {
  NormalizeButtonsCommand, NormalizeFormFieldsCommand,
  NormalizeSettingsCommand,
  NormalizeTitlesCommand,
} from '@packages/core/forms/capabilities'
import type { Form, NormalizedButtons, NormalizedFields, ObjectWithRawFields, RawButton, RawSetting, RawTitle } from '../axioma'
import { IFormStore, IRuleOptionsStore } from '../axioma'

/**
 * A class that provides functionality to create a form from raw fields and settings.
 */
export class CreateFormCommand<T extends ObjectWithRawFields, U extends RawSetting, V extends Record<'main' | 'aux', RawButton>> implements BaseCommand {
  public readonly meta = meta(CreateFormHandler)

  constructor(
    public readonly id: string,
    public readonly rawFields: T,
    public readonly rawTitles?: RawTitle,
    public readonly rawButtons?: V,
    public readonly rawSettings?: U,
  ) {}
}

class CreateFormHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private notificationStore: INotificationStore = inject(INotificationStore),
    private responseInterceptorStore: IResponseInterceptorStore = inject(IResponseInterceptorStore),
    private ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore),
  ) {}

  /**
   * Creates a form from raw fields and settings.
   *
   * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
   * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
   * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
   * @returns A `Form` object containing the normalized fields and settings.
   */
  execute<T extends ObjectWithRawFields, U extends RawSetting, V extends Record<'main' | 'aux', RawButton>>({ id, rawFields, rawSettings, rawButtons, rawTitles }: CreateFormCommand<T, U, V>): Form<T, V> {
    const formId = Symbol(id)
    const bus = new Bus()

    const normalizeFieldsCommand = new NormalizeFormFieldsCommand(rawFields)

    const originalNormalizedFields = bus.execute(normalizeFieldsCommand) as NormalizedFields<T>
    const clonedNormalizedFields = bus.execute(normalizeFieldsCommand) as NormalizedFields<T>

    const normalizeSettingsCommand = new NormalizeSettingsCommand(rawSettings)
    const normalizedSettings = bus.execute(normalizeSettingsCommand)

    const normalizeButtonsCommand = new NormalizeButtonsCommand(rawButtons)
    const normalizedButtons = bus.execute(normalizeButtonsCommand) as NormalizedButtons<V>

    const normalizeTitlesCommand = new NormalizeTitlesCommand(rawTitles)
    const normalizedTitles = bus.execute(normalizeTitlesCommand)

    this.formStore.save(formId, {
      originalNormalizedFields,
      fields: clonedNormalizedFields,
      titles: normalizedTitles,
      settings: normalizedSettings,
      buttons: normalizedButtons,
    })

    this.notificationStore.save(formId, {})
    this.responseInterceptorStore.save(formId, {})
    this.ruleOptionsStore.save(formId, {})

    return {
      id: formId,
      originalNormalizedFields,
      clonedNormalizedFields,
      normalizedSettings,
      normalizedButtons,
      normalizedTitles,
    }
  }
}
