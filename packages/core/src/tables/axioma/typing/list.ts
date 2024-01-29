import type { ListRequestOptions } from '@packages/core/common/http/axioma'

export interface RawTableList {
  isFetching?: boolean
  data?: any[]
  options?: ListRequestOptions
  fetchData?: () => void
}

export interface NormalizedTableList extends Required<RawTableList> {}
