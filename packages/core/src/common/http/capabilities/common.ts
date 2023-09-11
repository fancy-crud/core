import { IHttp } from '@packages/core/common/http/axioma'
import type { HttpRequest, PaginationStructure } from '../axioma'

const httpService: IHttp = {
  pagination: {
    results: <T>(data: any) => data.results as T[],
    count: (data: any) => data.count as number,
  },
  request: {},
} as IHttp

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
