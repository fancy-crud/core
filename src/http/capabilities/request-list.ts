import type { HttpService, ListRequestOptions } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestList {
  constructor(private http: HttpService) { }

  execute(url: string, params?: Record<string, unknown>, options?: ListRequestOptions) {
    this.http.get(url, params)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
