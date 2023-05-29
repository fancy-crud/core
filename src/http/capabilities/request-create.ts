import type { CreateRequestOptions, HttpService, JSONForm } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestCreate {
  constructor(private http: HttpService) { }

  execute(url: string, form: JSONForm | FormData, options?: CreateRequestOptions) {
    this.http.post(url, form)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
