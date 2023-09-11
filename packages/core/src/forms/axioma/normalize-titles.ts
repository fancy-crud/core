import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedTitles, RawTitle } from '@packages/core/forms/axioma'

export class NormalizeTitlesCommand implements BaseCommand {
  public readonly meta = meta(INormalizeTitlesHandler)

  constructor(
    public readonly titles?: RawTitle,
  ) {}
}

/**
 * A utility class that normalizes title configurations by using the provided title or default values.
 * Provides an `execute` method that takes an optional object containing title configurations
 * and returns a new object with normalized title properties.
 */
export abstract class INormalizeTitlesHandler {
  /**
   * Normalizes an optional object containing title configurations by using the provided title
   * or default values. Returns a new object with normalized title properties.
   *
   * @param {RawTitle} titles - An optional object containing title configurations to be normalized.
   * @returns {NormalizedTitles} - A new object with the normalized title properties.
   */
  abstract execute({ titles }: NormalizeTitlesCommand): NormalizedTitles
}
