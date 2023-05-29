export interface RawTablePagination {
  page?: number
  rowsPerPage?: number
  count?: number
}

export interface NormalizedTablePagination extends Required<RawTablePagination> {}
