import type { NormalizedButtons, NormalizedFields, RawButton } from '@fancy-crud/core'
import { Bus, CreateFormCommand, IFormStore, IRuleOptionsStore, ruleOptions } from '@fancy-crud/core'
import type { Args, ObjectWithRawFields, UseForm } from '@packages/vue/forms/integration'

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
export function useForm<T extends ObjectWithRawFields, U extends Record<string, RawButton>>(args: Args<T, U>): UseForm<T, U> {
  const {
    id: _id = '',
    fields: rawFields,
    titles: rawTitles,
    buttons: rawButtons,
    settings: rawSettings,
    ruleOptions: customRuleOptions,
  } = args

  const formStore: IFormStore = inject(IFormStore.name)!
  const ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore.name)!
  const bus = new Bus()

  const {
    id,
    originalNormalizedFields,
    clonedNormalizedFields,
    normalizedTitles,
    normalizedButtons,
    normalizedSettings,
  } = bus.execute(
    new CreateFormCommand(_id, rawFields, rawTitles, rawButtons, rawSettings),
  )

  const fields = reactive(clonedNormalizedFields) as NormalizedFields<T>
  const buttons = reactive(normalizedButtons) as NormalizedButtons<U>
  const titles = reactive(normalizedTitles)
  const settings = reactive(normalizedSettings)

  formStore.save(id, {
    originalNormalizedFields,
    fields,
    titles,
    settings,
    buttons,
  })

  ruleOptionsStore.save(id, {
    ...ruleOptions,
    ...customRuleOptions,
  })

  return {
    id,
    fields,
    titles,
    buttons,
    settings,
    bus,
  }
}
