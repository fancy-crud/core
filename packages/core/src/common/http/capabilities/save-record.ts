import { inject } from '@fancy-crud/bus'
import type { CreateRequestOptions, ISaveRecordHandler, SaveRecordCommand, UpdateRequestOptions } from '../axioma'
import { IRequestCreateHandler, IRequestUpdateHandler, RequestCreateCommand, RequestUpdateCommand } from '../axioma'

export class SaveRecordHandler implements ISaveRecordHandler {
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
