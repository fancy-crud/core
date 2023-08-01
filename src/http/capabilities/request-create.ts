import type { CreateRequestOptions, HttpService, JSONForm } from '../axioma'
import { onFailed, onFinally, onSuccess } from './common'

export class RequestCreateCommand {
  constructor(
    public readonly url: string,
    public readonly form: JSONForm | FormData,
    public readonly options?: CreateRequestOptions,
  ) {}
}

export class RequestCreateHandler {
  constructor(private http: HttpService = httpService) {}

  execute({ url, form, options }: RequestCreateCommand) {
    if (options?.onInit)
      options.onInit()

    this.http.post(url, form)
      .then(response => onSuccess(response, options))
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
