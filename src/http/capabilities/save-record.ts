import { Bus } from '@/common/bus/capabilities'
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
  private bus = new Bus()

  private createRecord(options?: CreateRequestOptions) {
    const command = new RequestCreateCommand(this.url, this.data, options)
    this.bus.execute(command)
  }

  private updateRecord(lookupValue: string, options?: UpdateRequestOptions) {
    const command = new RequestUpdateCommand(this.url, lookupValue, this.data, options)
    this.bus.execute(command)
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
