import type { ListRequestOptions } from '@packages/core/common/http/axioma'

export interface RawTableList {
  isFetching?: boolean
  data?: any[]
  options?: ListRequestOptions
}

export interface NormalizedTableList extends Required<RawTableList> {}
