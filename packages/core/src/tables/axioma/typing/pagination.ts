export interface RawTablePagination {
  page?: number
  rowsPerPage?: number
  count?: number
  rowsPerPageOptions?: number[]
  hidden?: boolean
}

export interface NormalizedTablePagination extends Required<RawTablePagination> {}
