import type { DeleteRequestOptions, HttpService } from '../axioma'
import { Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestDelete {
  constructor(private http: HttpService) { }

  execute(url: string, lookupValue: string | number, options?: DeleteRequestOptions) {
    const _url = new Url(url, lookupValue)
    this.http.delete(_url.value)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
