import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedSettings, RawSetting } from '@packages/core/forms/axioma'

export class NormalizeSettingsCommand implements BaseCommand {
  public readonly meta = meta(INormalizeSettingsHandler)

  constructor(
    public readonly settings?: RawSetting,
  ) {}
}

/**
 * A utility class that normalizes form settings configurations by merging them with default properties.
 * Provides an `execute` method that takes an optional object containing settings configurations
 * and returns a new object with normalized settings properties.
 */
export abstract class INormalizeSettingsHandler {
  /**
   * Normalizes an optional object containing settings configurations by merging each configuration
   * with the default properties. Returns a new object with normalized settings properties.
   *
   * @param {RawSetting} settings - An optional object containing settings configurations to be normalized.
   * @returns {NormalizedSettings} - A new object with the normalized settings properties.
   */
  abstract execute({ settings }: NormalizeSettingsCommand): NormalizedSettings
}
