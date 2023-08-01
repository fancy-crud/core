import type { CreateRequestOptions, UpdateRequestOptions } from '@/http/axioma'

export class SaveRecordCommand {
  constructor(
    public readonly url: string,
    public readonly data: Record<string, any> | FormData,
    public readonly mode: 'create' | 'update',
    public readonly lookupValue?: string,
    public readonly options?: CreateRequestOptions | UpdateRequestOptions,
  ) {}
}

export class SaveRecordHandler {
  private url!: string
  private data!: Record<string, any> | FormData

  private createRecord(options?: CreateRequestOptions) {
    const request = new RequestCreate(httpService)
    request.execute(this.url, this.data, options)
  }

  private updateRecord(lookupValue: string, options?: UpdateRequestOptions) {
    const request = new RequestUpdate(httpService)
    request.execute(this.url, lookupValue, this.data, options)
  }

  execute({ url, options, mode, lookupValue, data }: SaveRecordCommand) {
    this.url = url
    this.data = data

    if (mode === 'create')
      this.createRecord(options)
    else
      this.updateRecord(lookupValue || '', options)
  }
}
