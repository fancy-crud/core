import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedTableFilters, RawTableFilters } from '../axioma'

export class NormalizeTableFiltersCommand<T extends RawTableFilters> implements BaseCommand {
  public readonly meta = meta(INormalizeTableFiltersHandler)

  constructor(
    public readonly rawFilters: T,
  ) {}
}

export abstract class INormalizeTableFiltersHandler {
  abstract execute<T extends RawTableFilters>({ rawFilters }: NormalizeTableFiltersCommand<T>): T & NormalizedTableFilters
}
