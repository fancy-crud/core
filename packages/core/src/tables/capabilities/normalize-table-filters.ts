import type { INormalizeTableFiltersHandler, NormalizeTableFiltersCommand, NormalizedTableFilters, RawTableFilters } from '../axioma'

export class NormalizeTableFiltersHandler implements INormalizeTableFiltersHandler {
  execute<T extends RawTableFilters>({ rawFilters }: NormalizeTableFiltersCommand<T>): T & NormalizedTableFilters {
    return rawFilters as T & NormalizedTableFilters
  }
}
