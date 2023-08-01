import type { NormalizedTablePagination, RawTablePagination } from '@/tables/axioma'

export type NormalizePaginationCommandOutput = NormalizedTablePagination

export class NormalizePaginationCommand {
  constructor(
    public readonly rawPagination: RawTablePagination,
  ) {}
}

export class NormalizePaginationHandler {
  execute({ rawPagination }: NormalizePaginationCommand): NormalizePaginationCommandOutput {
    return {
      page: 1,
      rowsPerPage: 10,
      count: 0,
      ...rawPagination,
    }
  }
}
