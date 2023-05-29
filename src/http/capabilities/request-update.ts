import type { HttpService, JSONForm, UpdateRequestOptions } from '../axioma'
import { Url } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestUpdate {
  constructor(private http: HttpService) { }

  execute(url: string, lookupValue: string | number, form: JSONForm | FormData, options?: UpdateRequestOptions) {
    const _url = new Url(url, lookupValue)
    this.http.patch(_url.value, form)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
