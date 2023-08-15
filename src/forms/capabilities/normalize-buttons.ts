import type { BaseCommand } from '@/common/bus/axioma'
import type { NormalizedButton, NormalizedButtons, RawButton } from '@/forms/axioma'

export type NormalizeButtonsInputType = Record<'main' | 'aux', RawButton>

export class NormalizeButtonsCommand<T extends NormalizeButtonsInputType> implements BaseCommand {
  public readonly meta = meta(NormalizeButtonsHandler)

  constructor(
    public readonly buttons?: T,
  ) {}
}

/**
 * A utility class that normalizes button configurations by merging them with default properties.
 * Provides an `execute` method that takes an optional object containing button configurations
 * and returns a new object with normalized button properties.
**/
class NormalizeButtonsHandler {
  /**
   * Normalizes an optional object containing button configurations by merging each configuration
   * with the default properties. Returns a new object with normalized button properties.
   *
   * @template T - A generic type for the button configurations object.
   * @param {T} buttons - An optional object containing button configurations to be normalized.
   * @returns {NormalizedButtons<T>} - A new object with the normalized button properties.
  **/
  execute<T extends NormalizeButtonsInputType>({ buttons }: NormalizeButtonsCommand<T>): NormalizedButtons<T> {
    const { main = {}, aux = {} } = buttons || {}
    const defaults = getDefaults()

    const defaultMainButton: NormalizedButton = {
      ...defaults.mainButton,
      ...main,
      class: main?.class || defaults.mainButton?.class,
      isLoading: main?.isLoading || false,
      icon: main?.icon || '',
      label: {
        create: main?.label?.create || t('create-new'),
        update: main?.label?.update || t('update-record'),
      },
    }

    const defaultAuxButton: NormalizedButton = {
      ...defaults.auxButton,
      ...aux,
      isLoading: aux.isLoading || false,
      icon: aux.icon || '',
      class: aux.class || defaults.auxButton?.class,
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
