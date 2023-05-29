import type { PaginationStructure } from './pagination'

export interface HttpService {
  get<R = any, C = any>(url: string, config?: C): Promise<R>
  post<T, R = any, C = any>(url: string, data: T, config?: C): Promise<R>
  patch<T, R = any, C = any>(url: string, data: T, config?: C): Promise<R>
  delete<R = any, C = any>(url: string, config?: C): Promise<R>
  pagination: PaginationStructure
}

