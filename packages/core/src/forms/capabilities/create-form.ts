import { Bus, inject } from '@fancy-crud/bus'
import { INotificationStore } from '@packages/core/common/notifications/axioma'
import { IResponseInterceptorStore } from '@packages/core/common/response-interceptor/axioma'

import type {
  ConvertToNormalizedFormButtons,
  CreateFormCommand,
  ICreateFormHandler,
  RawFormButtons,
} from '@packages/core/forms/axioma'
import {
  NormalizeButtonsCommand,
  NormalizeFormFieldsCommand,
  NormalizeSettingsCommand,
} from '@packages/core/forms/axioma'
import { getDefaultInterceptors, getDefaultNotificationHandler, getDefaultRulesConfig } from '@packages/core/config'
import type { BaseObjectWithRawFields, Form, NormalizedFields, RawSetting } from '../axioma'
import { IFormStore, IRuleConfigStore } from '../axioma'

export class CreateFormHandler implements ICreateFormHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private notificationStore: INotificationStore = inject(INotificationStore),
    private responseInterceptorStore: IResponseInterceptorStore = inject(IResponseInterceptorStore),
    private ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore),
  ) {}

  execute<
    T extends BaseObjectWithRawFields,
    U extends RawSetting,
    V extends RawFormButtons,
  >(command: CreateFormCommand<T, U, V>): Form<T, V> {
    const {
      id,
      rawFields = {},
      rawSettings = {},
      rawButtons = {},
      responseInterceptor = {},
      notifications = {},
      rulesConfig = {},
    } = command

    const formId = Symbol(id)
    const bus = new Bus()

    const normalizeFieldsCommand = new NormalizeFormFieldsCommand(rawFields)

    const originalNormalizedFields = bus.execute(normalizeFieldsCommand) as NormalizedFields<T>
    const clonedNormalizedFields = bus.execute(normalizeFieldsCommand) as NormalizedFields<T>

    const normalizedSettings = bus.execute(
      new NormalizeSettingsCommand(rawSettings),
    )

    const normalizedButtons = bus.execute(
      new NormalizeButtonsCommand(rawButtons),
    ) as V & ConvertToNormalizedFormButtons<V>

    this.formStore.save(formId, {
      originalNormalizedFields,
      fields: clonedNormalizedFields,
      settings: normalizedSettings,
      buttons: normalizedButtons,
    })

    this.notificationStore.save(formId, {
      ...getDefaultNotificationHandler(),
      ...notifications,
    })

    this.responseInterceptorStore.save(formId, {
      ...getDefaultInterceptors(),
      ...responseInterceptor,
    })

    this.ruleConfigStore.save(formId, {
      ...getDefaultRulesConfig(),
      ...rulesConfig,
    })

    return {
      id: formId,
      originalNormalizedFields,
      clonedNormalizedFields,
      normalizedSettings,
      normalizedButtons,
    }
  }
}
