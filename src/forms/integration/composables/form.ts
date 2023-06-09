import type { NormalizedButtons, NormalizedFields, ObjectWithRawFields, RawButton } from '@fancy-crud/core'
import { CreateForm, ruleOptions } from '@fancy-crud/core'
import type { Args, UseForm } from '@/forms/integration'

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

  const {
    id,
    originalNormalizedFields,
    clonedNormalizedFields,
    normalizedTitles,
    normalizedButtons,
    normalizedSettings,
    manager,
  } = new CreateForm().execute(_id, rawFields, rawTitles, rawButtons, rawSettings)

  const fields = reactive(clonedNormalizedFields) as NormalizedFields<T>
  const buttons = reactive(normalizedButtons) as NormalizedButtons<U>
  const titles = reactive(normalizedTitles)
  const settings = reactive(normalizedSettings)

  manager.addForm({
    originalNormalizedFields,
    fields,
    titles,
    settings,
    buttons,
  })

  manager.setRuleOptions({
    ...ruleOptions,
    ...customRuleOptions,
  })

  onUnmounted(() => manager.removeForm())

  return {
    id,
    fields,
    titles,
    buttons,
    settings,
    manager,
  }
}
