import { FormManagerHandler } from './manager'
import { GenerateFormData } from './fields'
import type { CreateRequestOptions, UpdateRequestOptions } from '@/http/axioma'
import type { NormalizedSettings, ObjectWithNormalizedButtons, ObjectWithNormalizedFields } from '@/forms/axioma'
import { FormModes } from '@/forms/axioma'

export class CreateOrUpdateRecord {
  private manager: FormManagerHandler
  private fields: ObjectWithNormalizedFields
  private settings: NormalizedSettings
  private buttons: ObjectWithNormalizedButtons

  constructor(formId: symbol) {
    this.manager = new FormManagerHandler(formId)
    const { fields, settings, buttons } = this.manager.getForm()

    this.fields = fields
    this.settings = settings
    this.buttons = buttons
  }

  private createRecord(options?: CreateRequestOptions) {
    const { jsonForm, formData } = this.manager.getFormData()
    const _formData = formData || jsonForm

    const request = new RequestCreate(httpService)
    request.execute(this.settings.url, _formData, options)
  }

  private updateRecord(options?: UpdateRequestOptions) {
    const lookupValue = this.settings.lookupValue || ''

    const { jsonForm, formData } = new GenerateFormData().execute(this.fields)
    const _formData = formData || jsonForm

    const request = new RequestUpdate(httpService)
    request.execute(this.settings.url, lookupValue, _formData, options)
  }

  execute(options?: CreateRequestOptions | UpdateRequestOptions) {
    if (typeof this.buttons.main.onClick === 'function') {
      this.buttons.main.onClick()
      return
    }

    if (this.settings.mode === FormModes.CREATE_MODE)
      this.createRecord(options)
    else
      this.updateRecord(options)
  }
}
