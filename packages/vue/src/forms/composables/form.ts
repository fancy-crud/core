import type {
  BaseObjectWithRawFields,
  NormalizedButtons,
  NormalizedFields,
  NormalizedSettings,
  RawFormButtons,
  RawSetting,
} from '@fancy-crud/core'
import { Bus, CreateFormCommand, IFormStore } from '@fancy-crud/core'
import type { Args, UseForm } from '../typing'

export function useForm<
  TypeFields extends BaseObjectWithRawFields,
  TypeButtons extends RawFormButtons,
  TypeSettings extends RawSetting,
>(args: Args<TypeFields, TypeButtons, TypeSettings>): UseForm<TypeFields, TypeButtons, TypeSettings> {
  const {
    id: _id = '',
    fields: rawFields,
    buttons: rawButtons,
    settings: rawSettings,
    rulesConfig = {},
    responseInterceptor = {},
    notifications = {},
  } = args

  const formStore: IFormStore = inject(IFormStore.name)!
  const bus = new Bus()

  const {
    id,
    originalNormalizedFields,
    clonedNormalizedFields,
    normalizedButtons,
    normalizedSettings,
  } = bus.execute(
    new CreateFormCommand(_id, rawFields, rawButtons, rawSettings, responseInterceptor, notifications, rulesConfig),
  )

  const fields = reactive(clonedNormalizedFields) as NormalizedFields<TypeFields>
  const buttons = reactive(normalizedButtons) as NormalizedButtons<TypeButtons>
  const settings = reactive(normalizedSettings) as TypeSettings & NormalizedSettings

  formStore.save(id, {
    originalNormalizedFields,
    fields,
    settings,
    buttons,
  })

  return {
    id,
    fields,
    buttons,
    settings,
    bus,
  }
}
