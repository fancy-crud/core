import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { NormalizedTableFilters, RawTableFilters } from '..'

export class NormalizeTableFiltersCommand<T extends RawTableFilters> implements BaseCommand {
  public readonly meta = meta(INormalizeTableFiltersHandler)

  constructor(
    public readonly rawFilters: T,
  ) {}
}

export abstract class INormalizeTableFiltersHandler implements BaseHandler {
  abstract execute<T extends RawTableFilters>({ rawFilters }: NormalizeTableFiltersCommand<T>): T & NormalizedTableFilters
}
