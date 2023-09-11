import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedTablePagination, RawTablePagination } from '@packages/core/tables/axioma'

export class NormalizePaginationCommand implements BaseCommand {
  public readonly meta = meta(INormalizePaginationHandler)

  constructor(
    public readonly rawPagination: RawTablePagination,
  ) {}
}

export abstract class INormalizePaginationHandler {
  abstract execute({ rawPagination }: NormalizePaginationCommand): NormalizedTablePagination
}
