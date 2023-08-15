import type { BaseCommand } from '@/common/bus/axioma'
import type { NormalizedTablePagination, RawTablePagination } from '@/tables/axioma'

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
