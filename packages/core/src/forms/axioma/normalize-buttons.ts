import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedButtons, RawButton } from '@packages/core/forms/axioma'

export type NormalizeButtonsInputType = Record<'main' | 'aux', RawButton>

export class NormalizeButtonsCommand<T extends NormalizeButtonsInputType> implements BaseCommand {
  public readonly meta = meta(INormalizeButtonsHandler)

  constructor(
    public readonly buttons?: T,
  ) {}
}

/**
 * A utility class that normalizes button configurations by merging them with default properties.
 * Provides an `execute` method that takes an optional object containing button configurations
 * and returns a new object with normalized button properties.
**/
export abstract class INormalizeButtonsHandler {
  /**
   * Normalizes an optional object containing button configurations by merging each configuration
   * with the default properties. Returns a new object with normalized button properties.
   *
   * @template T - A generic type for the button configurations object.
   * @param {T} buttons - An optional object containing button configurations to be normalized.
   * @returns {NormalizedButtons<T>} - A new object with the normalized button properties.
  **/
  abstract execute<T extends NormalizeButtonsInputType>({ buttons }: NormalizeButtonsCommand<T>): NormalizedButtons<T>
}
