import { Bus, inject } from '@fancy-crud/bus'
import { RequestRetrieveCommand } from '@packages/core/common/http/axioma'
import type { LoadRemoteRecordCommand } from '../axioma'
import { IFormStore, SetFieldsValuesCommand } from '../axioma'

export class LoadRemoteRecordHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private bus = new Bus(),
  ) {}

  execute({ formId, lookupValue, options }: LoadRemoteRecordCommand): void {
    const form = this.formStore.searchById(formId)!

    const bus = this.bus

    bus.execute(
      new RequestRetrieveCommand(form.settings.url, String(lookupValue), {
        onSuccess: (response) => {
          bus.execute(
            new SetFieldsValuesCommand(form.fields, form.settings, response.data),
          )
        },
        ...options,
      }),
    )
  }
}
