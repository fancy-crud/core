import type { NormalizedButton, NormalizedButtons, RawButton } from '@/forms/axioma'

const t = useLocale()

/**
 * A utility class that normalizes button configurations by merging them with default properties.
 * Provides an `execute` method that takes an optional object containing button configurations
 * and returns a new object with normalized button properties.
**/
export class NormalizeButtons {
  /**
   * Normalizes an optional object containing button configurations by merging each configuration
   * with the default properties. Returns a new object with normalized button properties.
   *
   * @template T - A generic type for the button configurations object.
   * @param {T} buttons - An optional object containing button configurations to be normalized.
   * @returns {NormalizedButtons<T>} - A new object with the normalized button properties.
  **/
  execute<T extends Record<'main' | 'aux', RawButton>>(buttons?: T): NormalizedButtons<T> {
    const { main = {}, aux = {} } = buttons || {}
    const defaults = getDefaults()

    const defaultMainButton: NormalizedButton = {
      ...main,
      class: main?.class || defaults.classes.mainButton,
      isLoading: main?.isLoading || false,
      icon: main?.icon || '',
      label: {
        create: main?.label?.create || t('create-new'),
        update: main?.label?.update || t('update-record'),
      },
    }

    const defaultAuxButton: NormalizedButton = {
      ...aux,
      isLoading: aux.isLoading || false,
      icon: aux.icon || '',
      class: aux.class || defaults.classes.auxButton,
      label: {
        create: aux.label?.create || t('cancel'),
        update: aux.label?.update || t('cancel'),
      },
    }

    const defaultButtons = {
      main: defaultMainButton,
      aux: defaultAuxButton,
    }

    const normalizedButtons: NormalizedButtons<T> = Object.assign({}, buttons, defaultButtons)
    return normalizedButtons
  }
}
