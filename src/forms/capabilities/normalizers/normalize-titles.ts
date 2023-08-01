import type { NormalizedTitles, RawTitle } from '@/forms/axioma'

export type NormalizedTitlesCommandOutputType = NormalizedTitles

export class NormalizeTitlesCommand {
  constructor(
    public readonly titles?: RawTitle,
  ) {}
}

/**
 * A utility class that normalizes title configurations by using the provided title or default values.
 * Provides an `execute` method that takes an optional object containing title configurations
 * and returns a new object with normalized title properties.
 */
export class NormalizeTitlesHandler {
  /**
   * Normalizes an optional object containing title configurations by using the provided title
   * or default values. Returns a new object with normalized title properties.
   *
   * @param {RawTitle} titles - An optional object containing title configurations to be normalized.
   * @returns {NormalizedTitles} - A new object with the normalized title properties.
   */
  execute({ titles }: NormalizeTitlesCommand): NormalizedTitlesCommandOutputType {
    const {
      create = t('create-new-record'),
      update = t('update-record'),
    } = titles || {}

    const _titles: NormalizedTitles = {
      create,
      update,
    }

    return _titles
  }
}
