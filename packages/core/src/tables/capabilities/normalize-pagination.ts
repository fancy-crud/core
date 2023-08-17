import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedTablePagination, RawTablePagination } from '@packages/core/tables/axioma'

export class NormalizePaginationCommand implements BaseCommand {
  public readonly meta = meta(NormalizePaginationHandler)

  constructor(
    public readonly rawPagination: RawTablePagination,
  ) {}
}

class NormalizePaginationHandler {
  execute({ rawPagination }: NormalizePaginationCommand): NormalizedTablePagination {
    return {
      page: 1,
      rowsPerPage: 10,
      count: 0,
      ...rawPagination,
    }
  }
}
