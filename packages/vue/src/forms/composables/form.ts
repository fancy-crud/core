import type {
  BaseObjectWithRawFields,
  ConvertToNormalizedFormButtons,
  NormalizedButtons,
  NormalizedFields,
  NormalizedSettings,
  RawFormButtons,
  RawSetting,
} from '@fancy-crud/core'
import { Bus, CreateFormCommand, IFormStore, inject as injecting } from '@fancy-crud/core'
import { useProxies } from '@packages/vue/common/composables/proxies'
import type { Args, UseForm } from '../typing'

export function useForm<
  TypeFields extends BaseObjectWithRawFields,
  TypeButtons extends RawFormButtons,
  TypeSettings extends RawSetting,
>(args: Args<TypeFields, TypeButtons, TypeSettings>): UseForm<TypeFields, ConvertToNormalizedFormButtons<TypeButtons>, TypeSettings> {
  const {
    id: _id = '',
    fields: rawFields,
    buttons: rawButtons,
    settings: rawSettings,
    rulesConfig = {},
    responseInterceptor = {},
    notifications = {},
  } = args

  const formStore: IFormStore = injecting(IFormStore.name)!
  const bus = new Bus()

  type ProxyCollection = [
    TypeSettings & NormalizedSettings,
    NormalizedFields<TypeFields>,
    NormalizedButtons<ConvertToNormalizedFormButtons<TypeButtons>>,
  ]

  const { proxies, createProxy } = useProxies<ProxyCollection>([
    rawSettings,
    rawFields,
    rawButtons,
  ], [false, true, true])

  const [settings, fields, buttons] = proxies

  const {
    id,
    originalNormalizedFields,
    clonedNormalizedFields,
    normalizedButtons,
    normalizedSettings,
  } = bus.execute(
    new CreateFormCommand(_id, fields, buttons, settings, responseInterceptor, notifications, rulesConfig),
  )

  Object.assign(settings, normalizedSettings)
  Object.assign(fields, clonedNormalizedFields)
  Object.assign(buttons, normalizedButtons)

  formStore.save(id, {
    originalNormalizedFields,
    fields,
    settings,
    buttons,
  })

  createProxy()

  return {
    id,
    fields,
    buttons,
    settings,
    bus,
  }
}
