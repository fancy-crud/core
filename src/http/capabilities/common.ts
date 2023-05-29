import type { RequestDefaultOptions } from '../axioma'
import type { HttpService } from '@/http/axioma'

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

export const httpService: HttpService = {
  pagination: {
    results: <T>(data: any) => data.results as T[],
    count: (data: any) => data.count as number,
  },
} as HttpService

export function setHttpInstance(instance: Omit<HttpService, 'pagination'>) {
  Object.assign(httpService, instance)
}

export function setHttpPagination(pagination: HttpService['pagination']) {
  Object.assign(httpService, pagination)
}
