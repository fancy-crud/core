import type { HttpService, RetrieveRequestOptions } from '../axioma'
import { Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestRetrieve {
  constructor(private http: HttpService) { }

  execute(url: string, lookupValue: string | number, options?: RetrieveRequestOptions) {
    const _url = new Url(url, lookupValue)
    this.http.get(_url.value)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
