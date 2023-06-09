import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { PaginateResult, RequestList, httpService } from '@fancy-crud/core'
import type { ListRequestOptions, Pagination } from '@fancy-crud/core'

/**
 * Creates a record manager for a list of records from a given API endpoint.
 *
 * @template T - The type of the records in the list.
 * @template F - The type of the filter parameters.
 * @param {string} url - The API endpoint URL.
 * @param {F} [filterParams] - The filter parameters for the request.
 * @param {Pagination} [pagination] - The pagination settings for the request.
 * @param {ListRequestOptions} [options] - The additional options for the request.
 * @returns {RecordManager<T, F>} - The record manager object.
 */
export function useRequestList<T, F = any>(url: string, filterParams?: F, pagination?: Pagination, options?: ListRequestOptions) {
  const isFetching = ref(false)
  const mutableList: Ref<T[]> = ref([])

  const _filterParams = reactive(Object.assign({}, filterParams))
  const _pagination = reactive(
    Object.assign({ page: 1, count: 10, rowsPerPage: 10 }, pagination),
  )

  const list = computed(() => mutableList.value)

  watch(() => _filterParams, () => resetPagination(), { deep: true })
  watch(() => _pagination.page, () => {
    if (options?.hotFetch !== false)
      triggerRequest(_pagination.page)
  })

  if (options?.autoTrigger !== false)
    triggerRequest()

  /**
   * Sets the list data from the API response.
   *
   * @param {any} data - The data from the API response.
   * @returns {void}
   */
  function setDataList(data: any): void {
    if (Array.isArray(data)) {
      mutableList.value = data
      _pagination.count = data.length
      return
    }

    const paginateResults = new PaginateResult<T>(httpService.pagination, data)
    const results = paginateResults.results
    const count = paginateResults.count

    mutableList.value = results
    _pagination.count = count
  }

  /**
   * Resets the pagination to the first page and triggers a new request.
   *
   * @returns {void}
   */
  function resetPagination(): void {
    _pagination.page = 1

    if (options?.hotFetch !== false)
      triggerRequest()
  }

  /**
   * Triggers a request to the API endpoint.
   *
   * @param {number} [page=1] - The page number for the request.
   * @returns {void}
   */
  function triggerRequest(page = 1): void {
    isFetching.value = true
    const params = {
      limit: 10,
      offset: 0,
      ..._filterParams,
    }

    const offset = (page - 1) * params.limit

    if (offset > 0)
      params.offset = offset

    const requestList = new RequestList(httpService)

    requestList.execute(url, params, {
      ...options,

      onSuccess(response: AxiosResponse) {
        setDataList(response.data)

        if (typeof options?.onSuccess === 'function')
          options?.onSuccess(response)
      },

      onFinally() {
        isFetching.value = false
        if (typeof options?.onFinally === 'function')
          options.onFinally()
      },
    })
  }

  return {
    triggerRequest,
    filterParams: _filterParams,
    pagination: _pagination,
    isFetching,
    list,
  }
}
