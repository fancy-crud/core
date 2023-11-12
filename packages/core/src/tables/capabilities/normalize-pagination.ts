import type { INormalizePaginationHandler, NormalizePaginationCommand, NormalizedTablePagination } from '../axioma'

export class NormalizePaginationHandler implements INormalizePaginationHandler {
  execute({ rawPagination }: NormalizePaginationCommand): NormalizedTablePagination {
    return {
      page: 1,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 25, 50, 100],
      count: 0,
      ...rawPagination,
    }
  }
}
