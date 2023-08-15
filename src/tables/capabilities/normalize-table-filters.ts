import type { NormalizedTableFilters, RawTableFilters } from '@/tables/axioma'
import type { BaseCommand } from '@/common/bus/axioma'

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
