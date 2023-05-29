import type { Pagination } from './pagination'
export * from './pagination'
export * from './http'

export interface HandleRequestStatusCodes extends Record<number, (form: any, data: any) => void> {}

export interface SameAPIEndpoint extends Record<string, string[]> {}

export interface Params {
  [key: string]: unknown
}

export interface JSONForm {
  [key: string]: unknown
}

interface RequestRecord {
  url: string
  form: JSONForm | FormData
}

type FilterParams<T> = { [Key in keyof T]: unknown }

export interface GetListRequest<T = {}> {
  url: string
  _search?: string
  filterParams?: FilterParams<T> | {}
  pagination?: Pagination
}

export interface UpdateRequest extends RequestRecord {
  lookupValue: string | number
}

export interface RetrieveRequest {
  url: string
  lookupValue: string | number
}

export interface DeleteRequest {
  url: string
  lookupValue: string | number
  hardDelete?: boolean
  fieldName?: string
}

export interface RequestResponse {
  isActionSucceed: boolean
  value: unknown
}

export type OnSuccess = (response: any) => void
export type OnFailed = (error: any) => void
export type OnFinally = () => void

export interface DefaultOptions {
  onSuccess?: () => void
  onFailed?: (e: any) => void
}

export interface RequestDefaultOptions {
  onSuccess?: OnSuccess
  onFailed?: OnFailed
  onFinally?: OnFinally
  autoTrigger?: boolean
}

export interface CreateRequestOptions extends RequestDefaultOptions { }
export interface UpdateRequestOptions extends RequestDefaultOptions { }
export interface RetrieveRequestOptions extends RequestDefaultOptions { }
export interface DeleteRequestOptions extends RequestDefaultOptions { }

export interface ListRequestOptions extends RequestDefaultOptions {
  hotFetch?: boolean
}

