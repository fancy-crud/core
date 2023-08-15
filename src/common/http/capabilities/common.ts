import type { RequestDefaultOptions } from '../axioma'
import { IHttp } from '@/common/http/axioma'

const httpService: IHttp = {
  pagination: {
    results: <T>(data: any) => data.results as T[],
    count: (data: any) => data.count as number,
  },
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

export function setHttpInstance(instance: Omit<IHttp, 'pagination'>) {
  Object.assign(httpService, instance)
}

export function setHttpPagination(pagination: IHttp['pagination']) {
  Object.assign(httpService, pagination)
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
