import type { NormalizedTablePagination, RawTablePagination } from '@/tables/axioma'

export class NormalizePagination {
  execute(rawPagination: RawTablePagination): NormalizedTablePagination {
    return {
      page: 1,
      rowsPerPage: 10,
      count: 0,
      ...rawPagination,
    }
  }
}
