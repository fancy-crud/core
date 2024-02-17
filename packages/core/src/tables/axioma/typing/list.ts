import type { ListRequestOptions } from '@packages/core/common/http/axioma'

export interface RawTableList<T = unknown> {
  isFetching?: boolean
  data?: T[]
  options?: ListRequestOptions
  fetchData?: () => void
}

export interface NormalizedTableList<T = unknown> extends Required<RawTableList<T>> {}
