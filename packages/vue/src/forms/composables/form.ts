import type {
  BaseObjectWithRawFields,
  NormalizedButtons,
  NormalizedFields,
  NormalizedSettings,
  RawFormButtons,
  RawSetting,
} from '@fancy-crud/core'
import { Bus, CreateFormCommand, IFormStore, IRuleConfigStore, rulesConfig } from '@fancy-crud/core'
import type { Args, UseForm } from '../typing'

/**
 * A function that provides functionality to create a reactive form object from raw fields, titles, buttons, and settings.
 *
 * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
 * @typeparam U - A generic type parameter that extends `Record<string, RawButton>`.
 * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
 * @param rawTitles - An optional `RawTitle` object containing the raw titles to be normalized.
 * @param rawButtons - An optional `Record<string, RawButton>` object containing the raw buttons to be normalized.
 * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
 * @returns A `UseForm` object containing the reactive fields, titles, buttons, and settings.
 */
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
    rulesConfig: customRulesConfig,
  } = args

  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleConfigStore: IRuleConfigStore = inject(IRuleConfigStore.name)!
  const bus = new Bus()

  const {
    id,
    originalNormalizedFields,
    clonedNormalizedFields,
    normalizedButtons,
    normalizedSettings,
  } = bus.execute(
    new CreateFormCommand(_id, rawFields, rawButtons, rawSettings),
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

  ruleConfigStore.save(id, {
    ...rulesConfig,
    ...customRulesConfig,
  })

  return {
    id,
    fields,
    buttons,
    settings,
    bus,
  }
}
