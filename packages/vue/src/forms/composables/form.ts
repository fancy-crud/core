import type {
  BaseObjectWithRawFields,
  ConvertToNormalizedFormButtons,
  NormalizedButtons,
  NormalizedFields,
  NormalizedSettings,
  RawFormButtons,
  RawSetting,
  RecordObject,
  RecordObjectValue,
} from '@fancy-crud/core'
import { Bus, CreateFormCommand, IFormStore, inject as injecting } from '@fancy-crud/core'
import { useProxies } from '@packages/vue/common/composables/proxies'
import type { Args, InferNormalizedModelValue, UseForm } from '../typing'

export function useForm<
  TypeFields extends BaseObjectWithRawFields,
  TypeButtons extends RawFormButtons,
  TypeSettings extends RawSetting,
  RecordObjectValueType extends RecordObjectValue = RecordObjectValue,
>(args: Args<TypeFields, TypeButtons, TypeSettings, RecordObjectValueType>): UseForm<TypeFields, ConvertToNormalizedFormButtons<TypeButtons>, TypeSettings, RecordObjectValueType> {
  const {
    id: _id = '',
    fields: rawFields,
    buttons: rawButtons,
    settings: rawSettings,
    rulesConfig = {},
    responseInterceptor = {},
    notifications = {},
    record: rawRecord = { value: null },
  } = args

  const formStore: IFormStore = injecting(IFormStore.name)!
  const bus = new Bus()

  type ProxyCollection = [
    TypeSettings & NormalizedSettings,
    NormalizedFields<InferNormalizedModelValue<TypeFields, NonNullable<RecordObjectValueType>>>,
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
    record,
  } = bus.execute(
    new CreateFormCommand(_id, fields, buttons, settings, responseInterceptor, notifications, rulesConfig, rawRecord),
  )

  Object.assign(settings, normalizedSettings)
  Object.assign(fields, clonedNormalizedFields)
  Object.assign(buttons, normalizedButtons)

  const form = {
    id,
    fields,
    buttons,
    settings,
    bus,
    originalNormalizedFields,
    record: ref(record.value) as RecordObject<RecordObjectValueType>,
  }

  // watch(() => form.record.value, console.log)

  formStore.save(id, form)

  createProxy(form)

  return form
}
