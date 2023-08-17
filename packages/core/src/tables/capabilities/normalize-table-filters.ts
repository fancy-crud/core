import type { NormalizedTableFilters, RawTableFilters } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class NormalizeTableFiltersCommand<T extends RawTableFilters> implements BaseCommand {
  public readonly meta = meta(NormalizeTableFiltersHandler)

  constructor(
    public readonly rawFilters: T,
  ) {}
}

class NormalizeTableFiltersHandler {
  execute<T extends RawTableFilters>({ rawFilters }: NormalizeTableFiltersCommand<T>): T & NormalizedTableFilters {
    return rawFilters as T & NormalizedTableFilters
  }
}
