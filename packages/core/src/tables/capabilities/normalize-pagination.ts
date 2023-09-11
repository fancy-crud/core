import type { INormalizePaginationHandler, NormalizePaginationCommand, NormalizedTablePagination } from '../axioma'

export class NormalizePaginationHandler implements INormalizePaginationHandler {
  execute({ rawPagination }: NormalizePaginationCommand): NormalizedTablePagination {
    return {
      page: 1,
      rowsPerPage: 10,
      count: 0,
      ...rawPagination,
    }
  }
}
