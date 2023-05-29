import type { NormalizedTitles, RawTitle } from '@/forms/axioma'

const t = useLocale()

/**
 * A utility class that normalizes title configurations by using the provided title or default values.
 * Provides an `execute` method that takes an optional object containing title configurations
 * and returns a new object with normalized title properties.
 */
export class NormalizeTitles {
  /**
   * Normalizes an optional object containing title configurations by using the provided title
   * or default values. Returns a new object with normalized title properties.
   *
   * @param {RawTitle} titles - An optional object containing title configurations to be normalized.
   * @returns {NormalizedTitles} - A new object with the normalized title properties.
   */
  execute(titles?: RawTitle): NormalizedTitles {
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
