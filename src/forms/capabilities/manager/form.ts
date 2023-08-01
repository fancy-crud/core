import { ResponseManagerHandler } from './response'
import { NotificationManagerHandler } from './notification'
import { RuleOptionsManagerHandler } from './rules'
import { Bus } from '@/common/bus/capabilities'
import type { FieldErrors, FormManager, FormMap, GenerateFormDataOutput, ManagerMap, NotificationManager, ObjectWithNormalizedFields, ResponseManager, RuleOptions, RuleOptionsManager } from '@/forms/axioma'
import { GetForeignKeyValuesCommand } from '@/http/capabilities'
import { FormMode } from '@/forms/axioma'

export class FormManagerHandler implements FormManager {
  readonly responseManager: ResponseManager
  readonly notificationManager: NotificationManager
  readonly ruleOptionsManager: RuleOptionsManager

  private static map: ManagerMap<FormMap>

  public readonly bus = new Bus()

  constructor(private id: symbol) {
    this.responseManager = new ResponseManagerHandler(id)
    this.notificationManager = new NotificationManagerHandler(id)
    this.ruleOptionsManager = new RuleOptionsManagerHandler(id)
  }

  get ruleOptions(): RuleOptions {
    return this.ruleOptionsManager.getRuleOptions()
  }

  static setManagerMap(managerMap: ManagerMap<FormMap>) {
    FormManagerHandler.map = managerMap
  }

  getForm(): FormMap {
    const form = FormManagerHandler.map.get(this.id)

    if (!form)
      throw new Error(`Unable to found form id(${String(this.id)})`)

    return form
  }

  addForm(form: FormMap) {
    FormManagerHandler.map.set(this.id, form)

    // TODO: Create default handlers
    this.responseManager.setResponseHandler({
      400: (errors: any) => this.bus.execute(
        new CatchErrorsCommand(form.fields, errors),
      ),
    })
  }

  removeForm() {
    FormManagerHandler.map.delete(this.id)
    this.notificationManager.removeNotificationHandlers()
    this.responseManager.removeResponseHandlers()
  }

  /**
   * @deprecated Use the commands pattern with bus.execute method instead.
   */
  fillWithRecordValues(record: Record<string, unknown>) {
    const form = this.getForm()
    const fillWithRecordValuesCommand = new FillWithRecordValuesCommand(form.fields, form.settings, record)

    this.bus.execute(fillWithRecordValuesCommand)
  }

  /**
   * @deprecated Use the commands pattern with bus.execute method instead.
   */
  resetFields() {
    const form = this.getForm()
    const resetFieldsCommand = new ResetFieldsCommand(form.fields, form.originalNormalizedFields)

    this.bus.execute(resetFieldsCommand)
  }

  /**
   * @deprecated Use the commands pattern with bus.execute method instead.
   */
  getForeignKeyValues(fields?: ObjectWithNormalizedFields) {
    const form = fields ? { fields } : this.getForm()
    const getForeignKeyValuesCommand = new GetForeignKeyValuesCommand({ ...form.fields })

    this.bus.execute(getForeignKeyValuesCommand)
  }

  /**
   * @deprecated Use the commands pattern with bus.execute method instead.
   */
  getFormData(fields?: ObjectWithNormalizedFields) {
    const form = fields ? { fields } : this.getForm()

    const generateFormDataCommand = new GenerateFormDataCommand(form.fields)
    return this.bus.execute<GenerateFormDataOutput<typeof form.fields>>(generateFormDataCommand)
  }

  /**
   * @deprecated Use the commands pattern with bus.execute method instead.
   */
  setErrors(errors: FieldErrors) {
    const form = this.getForm()

    const catchErrorsCommand = new CatchErrorsCommand(form.fields, errors)
    this.bus.execute(catchErrorsCommand)
  }

  switchToCreateMode() {
    const form = this.getForm()

    form.settings.mode = FormModes.CREATE_MODE
  }

  switchToUpdateMode() {
    const form = this.getForm()

    form.settings.mode = FormModes.UPDATE_MODE
  }

  isFormValid(options: RuleOptions = {}) {
    const form = this.getForm()

    const validateFormCommand = new ValidateFormCommand(form.fields, {
      ...this.ruleOptions,
      ...options,
    })

    return this.bus.execute<boolean>(validateFormCommand)
  }

  setRuleOptions(ruleOptions: RuleOptions = {}) {
    this.ruleOptionsManager.setRuleOptions(ruleOptions)
  }
}
