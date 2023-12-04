import type { Pagination } from '@fancy-crud/core'
import type { TableFooterEmit } from '../typing'

export function useTableFooter({ rowsPerPage = 10, page = 1 }, emit: TableFooterEmit) {
  const state = reactive({
    pagination: {
      perPage: rowsPerPage,
      page,
    },
  })

  watch(() => state.pagination.perPage, rowsPerPage => updatePagination({ rowsPerPage }))
  watch(() => state.pagination.page, page => updatePagination({ page }))

  function updatePagination(pagination: Pagination) {
    emit('update:pagination', pagination)
  }

  return state
}
