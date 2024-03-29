import { Bus, inject } from '@fancy-crud/bus'
import { SetFieldsErrorsCommand } from '../commands/set-fields-errors'
import { IFormStore } from './form-store'

export function getDefaultInterceptors(formId: symbol) {
  const bus = new Bus()
  const formStore: IFormStore = inject(IFormStore)

  return {
    400: (error: { response?: { data: any } }) => {
      const form = formStore.searchById(formId)

      if (!form)
        return

      const { fields } = form

      const errors = error.response?.data

      if (!errors)
        return

      bus.execute(
        new SetFieldsErrorsCommand(fields, errors),
      )
    },
  }
}
