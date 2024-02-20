import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { NormalizedTablePagination, RawTablePagination } from '@packages/core/tables/axioma'

export class NormalizePaginationCommand implements BaseCommand {
  public readonly meta = meta(INormalizePaginationHandler)

  constructor(
    public readonly rawPagination: RawTablePagination,
  ) {}
}

export abstract class INormalizePaginationHandler implements BaseHandler {
  abstract execute({ rawPagination }: NormalizePaginationCommand): NormalizedTablePagination
}
