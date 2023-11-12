export interface RawTablePagination {
  page?: number
  rowsPerPage?: number
  count?: number
  rowsPerPageOptions?: number[]
}

export interface NormalizedTablePagination extends Required<RawTablePagination> {}
