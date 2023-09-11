import type { NormalizedTitles } from '@packages/core/forms/axioma'
import { t } from '@packages/core/locales'
import type { INormalizeTitlesHandler, NormalizeTitlesCommand } from '../axioma'

export class NormalizeTitlesHandler implements INormalizeTitlesHandler {
  execute({ titles }: NormalizeTitlesCommand): NormalizedTitles {
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
