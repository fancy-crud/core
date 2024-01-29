import type { PaginationStructure } from './pagination'

export interface HttpRequestPost {
  request: {
    post<T, R = any, C = any>(url: string, data: T, config?: C): Promise<R>
  }
}

export interface HttpRequestGet {
  request: {
    get<R = any, C = any>(url: string, config?: C): Promise<R>
  }
}

export interface HttpRequestPatch {
  request: {
    patch<T, R = any, C = any>(url: string, data: T, config?: C): Promise<R>
  }
}

export interface HttpRequestDelete {
  request: {
    delete<R = any, C = any>(url: string, config?: C): Promise<R>
  }
}

export type HttpRequest = HttpRequestPost & HttpRequestGet & HttpRequestPatch & HttpRequestDelete

export interface HttpHooks {
  onRetrieveSuccess?: (response: any) => any
}

export abstract class IHttp {
  abstract pagination: PaginationStructure
  abstract request: HttpRequest['request']
  abstract hooks: HttpHooks
}
