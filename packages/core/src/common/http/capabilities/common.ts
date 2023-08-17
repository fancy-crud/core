import { IHttp } from '@packages/core/common/http/axioma'
import { injectable } from '@packages/core/common/bus/capabilities'
import type { HttpRequest, PaginationStructure, RequestDefaultOptions } from '../axioma'

const httpService: IHttp = {
  pagination: {
    results: <T>(data: any) => data.results as T[],
    count: (data: any) => data.count as number,
  },
  request: {},
} as IHttp

export function onSuccess(response: unknown, options?: RequestDefaultOptions) {
  if (typeof options?.onSuccess === 'function')
    options?.onSuccess(response)
}

export function onFailed(error: unknown, options?: RequestDefaultOptions) {
  if (typeof options?.onFailed === 'function')
    options?.onFailed(error)
}

export function onFinally(options?: RequestDefaultOptions) {
  if (typeof options?.onFinally === 'function')
    options?.onFinally()
}

export function setHttpRequest(request: HttpRequest) {
  Object.assign(httpService.request, request)
}

export function setHttpPagination(pagination: PaginationStructure) {
  Object.assign(httpService.pagination, pagination)
}

export class HttpService extends IHttp {
  get pagination() {
    return httpService.pagination
  }

  get request() {
    return httpService.request
  }
}

injectable(IHttp.name, HttpService)
