import { inject } from '@fancy-crud/bus'
import type { IRequestRetrieveHandler, RequestRetrieveCommand } from '../axioma'
import { IHttp, onFailed, onFinally, onSuccess } from '../axioma'

export class RequestRetrieveHandler implements IRequestRetrieveHandler {
  constructor(
    private http: Pick<IHttp, 'request' | 'hooks'> = inject(IHttp),
  ) {}

  execute({ url, options }: RequestRetrieveCommand): void {
    if (options?.onInit)
      options.onInit()

    const onRetrieveSuccess = this.http.hooks?.onRetrieveSuccess || ((response: any) => response)

    this.http.request.get(url)
      .then((response: any) => {
        const data: any = onRetrieveSuccess(response)
        onSuccess(data, options)
      })
      .catch(e => onFailed(e, options))
      .finally(() => onFinally(options))
  }
}
