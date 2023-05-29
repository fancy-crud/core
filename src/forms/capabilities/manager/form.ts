import { FillWithRecordValues, GenerateFormData, HandleErrors, ResetFields } from '../fields'
import { ResponseManagerHandler } from './response'
import { NotificationManagerHandler } from './notification'
import type { FieldErrors, FormManager, FormMap, NotificationManager, ObjectWithNormalizedFields, ResponseManager } from '@/forms/axioma'
import { FormModes, NotificationType } from '@/forms/axioma'
import { GetForeignKeyValues } from '@/http/axioma'

const forms = new Map<symbol, FormMap>()

export class FormManagerHandler implements FormManager {
  readonly responseManager: ResponseManager
  readonly notificationManager: NotificationManager

  constructor(private id: symbol) {
    this.responseManager = new ResponseManagerHandler(id)
    this.notificationManager = new NotificationManagerHandler(id)
  }

  getForm(): FormMap {
    const form = forms.get(this.id)

    if (!form)
      throw new Error(`Unable to found form id(${String(this.id)})`)

    return form
  }

  addForm(form: FormMap) {
    forms.set(this.id, form)

    // TODO: Create default handlers
    this.responseManager.setResponseHandler({
      400: (errors: any) => this.setErrors(errors),
    })
  }

  removeForm() {
    forms.delete(this.id)
    this.notificationManager.removeNotificationHandlers()
    this.responseManager.removeResponseHandlers()
  }

  fillWithRecordValues(record: Record<string, unknown>) {
    const form = this.getForm()
    const fillWithRecordValues = new FillWithRecordValues()
    fillWithRecordValues.execute(form.fields, record)

    form.settings.lookupValue = String(record[form.settings.lookupField] || '')
  }

  resetFields() {
    const form = this.getForm()
    const reset = new ResetFields()

    reset.execute(form.fields, form.originalNormalizedFields)
  }

  getForeignKeyValues(fields?: ObjectWithNormalizedFields) {
    const form = fields ? { fields } : this.getForm()
    const getForeignKeyValues = new GetForeignKeyValues(httpService)

    getForeignKeyValues.execute({ ...form.fields })
  }

  getFormData(fields?: ObjectWithNormalizedFields) {
    const form = fields ? { fields } : this.getForm()

    const formData = new GenerateFormData()
    return formData.execute(form.fields)
  }

  setErrors(errors: FieldErrors) {
    const form = this.getForm()

    const handleErrors = new HandleErrors()
    handleErrors.execute(form.fields, errors)

    if (!form.settings.disableNotifications)
      this.notificationManager.pushNotification({ type: NotificationType.error, data: errors })
  }

  switchToCreateMode() {
    const form = this.getForm()

    form.settings.mode = FormModes.CREATE_MODE
  }

  switchToUpdateMode() {
    const form = this.getForm()

    form.settings.mode = FormModes.UPDATE_MODE
  }
}
