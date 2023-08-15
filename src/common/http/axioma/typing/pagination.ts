export interface PaginationStructure {
  results: <T>(response: any) => T[]
  count: (response: any) => number
}

export interface Pagination {
  page?: number
  count?: number
  rowsPerPage?: number
}
