import { IHttp } from '@packages/core/common/http/axioma'
import type { HttpHooks, HttpRequest, PaginationStructure } from '../axioma'

const httpService: IHttp = {
  pagination: {
    results: <T>(data: any) => data.results as T[],
    count: (data: any) => data.count as number,
  },
  request: {},
  hooks: {},
} as IHttp

export function setHttpRequest(request: HttpRequest['request']) {
  Object.assign(httpService.request, request)
}

export function setHttpPagination(pagination: PaginationStructure) {
  Object.assign(httpService.pagination, pagination)
}

export function setHttpHooks(hooks: HttpHooks) {
  Object.assign(httpService.hooks, hooks)
}

export class HttpService extends IHttp {
  get pagination() {
    return httpService.pagination
  }

  get request() {
    return httpService.request
  }

  get hooks(): HttpHooks {
    return httpService.hooks
  }
}
