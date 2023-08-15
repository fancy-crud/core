import { IRequestCreateHandler } from './request-create'
import { IRequestUpdateHandler } from './request-update'
import type { BaseCommand } from '@/common/bus/axioma'
import type { CreateRequestOptions, UpdateRequestOptions } from '@/common/http/axioma'

export class SaveRecordCommand implements BaseCommand {
  public readonly meta = meta(SaveRecordHandler)

  constructor(
    public readonly url: string,
    public readonly data: Record<string, any> | FormData,
    public readonly mode: 'create' | 'update',
    public readonly lookupValue?: string,
    public readonly options?: CreateRequestOptions | UpdateRequestOptions,
  ) {}
}

class SaveRecordHandler {
  private url!: string
  private data!: Record<string, any> | FormData

  constructor(
    private requestCreate: IRequestCreateHandler = inject(IRequestCreateHandler),
    private requestUpdate: IRequestUpdateHandler = inject(IRequestUpdateHandler),
  ) {}

  private createRecord(options?: CreateRequestOptions) {
    const command = new RequestCreateCommand(this.url, this.data, options)
    this.requestCreate.execute(command)
  }

  private updateRecord(lookupValue: string, options?: UpdateRequestOptions) {
    const command = new RequestUpdateCommand(this.url, lookupValue, this.data, options)
    this.requestUpdate.execute(command)
  }

  execute({ url, options, mode, lookupValue, data }: SaveRecordCommand): void {
    this.url = url
    this.data = data

    if (mode === 'create')
      this.createRecord(options)
    else
      this.updateRecord(lookupValue || '', options)
  }
}
