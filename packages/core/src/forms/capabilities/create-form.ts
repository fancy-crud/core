import { Bus, inject } from '@fancy-crud/bus'
import { INotificationStore } from '@packages/core/common/notifications/axioma'
import { IResponseInterceptorStore } from '@packages/core/common/response-interceptor/axioma'

import type {
  CreateFormCommand,
  ICreateFormHandler,
} from '@packages/core/forms/axioma'
import {
  NormalizeButtonsCommand,
  NormalizeFormFieldsCommand,
  NormalizeSettingsCommand,
} from '@packages/core/forms/axioma'
import { getDefaultInterceptors, getDefaultNotificationHandler } from '@packages/core/config'
import type { BaseObjectWithRawFields, Form, NormalizedButtons, NormalizedFields, RawButton, RawSetting } from '../axioma'
import { IFormStore, IRuleConfigStore } from '../axioma'

export class CreateFormHandler implements ICreateFormHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private notificationStore: INotificationStore = inject(INotificationStore),
    private responseInterceptorStore: IResponseInterceptorStore = inject(IResponseInterceptorStore),
    private ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore),
  ) {}

  /**
   * Creates a form from raw fields and settings.
   *
   * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
   * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
   * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
   * @returns A `Form` object containing the normalized fields and settings.
   */
  execute<T extends BaseObjectWithRawFields, U extends RawSetting, V extends Record<'main' | 'aux', RawButton>>({ id, rawFields, rawSettings, rawButtons }: CreateFormCommand<T, U, V>): Form<T, V> {
    const formId = Symbol(id)
    const bus = new Bus()

    const normalizeFieldsCommand = new NormalizeFormFieldsCommand(rawFields)

    const originalNormalizedFields = bus.execute(normalizeFieldsCommand) as NormalizedFields<T>
    const clonedNormalizedFields = bus.execute(normalizeFieldsCommand) as NormalizedFields<T>

    const normalizeSettingsCommand = new NormalizeSettingsCommand(rawSettings)
    const normalizedSettings = bus.execute(normalizeSettingsCommand)

    const normalizeButtonsCommand = new NormalizeButtonsCommand(rawButtons)
    const normalizedButtons = bus.execute(normalizeButtonsCommand) as NormalizedButtons<V>

    this.formStore.save(formId, {
      originalNormalizedFields,
      fields: clonedNormalizedFields,
      settings: normalizedSettings,
      buttons: normalizedButtons,
    })

    this.notificationStore.save(formId, getDefaultNotificationHandler())
    this.responseInterceptorStore.save(formId, getDefaultInterceptors())
    this.ruleConfigStore.save(formId, {})

    return {
      id: formId,
      originalNormalizedFields,
      clonedNormalizedFields,
      normalizedSettings,
      normalizedButtons,
    }
  }
}
