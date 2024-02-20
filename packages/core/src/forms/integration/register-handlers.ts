import { register } from '@fancy-crud/bus'
import {
  ICreateFormHandler, IDispatchOnFailedFormEventHandler, IDispatchOnSuccessFormEventHandler, IFilterFieldsByFormModeHandler,
  IGenerateFormDataHandler, IGetButtonLabelByFormModeHandler,
  IGetTitleByFomModeHandler, ILoadRemoteRecordHandler, INormalizeButtonsHandler,
  INormalizeFormFieldsHandler, INormalizeSettingsHandler,
  IResetFieldsByFormIdHandler,
  IResetFieldsHandler, ISaveFormHandler, ISetFieldsErrorsHandler,
  ISetFieldsValuesHandler, ISwitchFormToCreateModeHandler,
  ISwitchFormToUpdateModeHandler, ITriggerFormNotificationHandler, ITriggerFormResponseInterceptorHandler, IValidateFieldRulesHandler,
  IValidateFormHandler,
} from '../axioma'
import {
  CreateFormHandler,
  DispatchOnFailedFormEventHandler,
  DispatchOnSuccessFormEventHandler,
  FilterFieldsByFormModeHandler,
  GenerateFormDataHandler,
  GetButtonLabelByFormModeHandler,
  GetTitleByFomModeHandler,
  LoadRemoteRecordHandler,
  NormalizeButtonsHandler,
  NormalizeFormFieldsHandler,
  NormalizeSettingsHandler,
  ResetFieldsByFormIdHandler,
  ResetFieldsHandler,
  SaveFormHandler,
  SetFieldsErrorsHandler,
  SetFieldsValuesHandler,
  SwitchFormToCreateModeHandler,
  SwitchFormToUpdateModeHandler,
  TriggerFormNotificationHandler,
  TriggerFormResponseInterceptorHandler,
  ValidateFieldRulesHandler,
  ValidateFormHandler,
} from '../capabilities'

register(ICreateFormHandler.name, CreateFormHandler)
register(IFilterFieldsByFormModeHandler.name, FilterFieldsByFormModeHandler)
register(IGenerateFormDataHandler.name, GenerateFormDataHandler)
register(IGetButtonLabelByFormModeHandler.name, GetButtonLabelByFormModeHandler)
register(IGetTitleByFomModeHandler.name, GetTitleByFomModeHandler)
register(INormalizeButtonsHandler.name, NormalizeButtonsHandler)
register(INormalizeFormFieldsHandler.name, NormalizeFormFieldsHandler)
register(INormalizeSettingsHandler.name, NormalizeSettingsHandler)
register(IResetFieldsByFormIdHandler.name, ResetFieldsByFormIdHandler)
register(IResetFieldsHandler.name, ResetFieldsHandler)
register(ISetFieldsErrorsHandler.name, SetFieldsErrorsHandler)
register(ISetFieldsValuesHandler.name, SetFieldsValuesHandler)
register(ISwitchFormToCreateModeHandler.name, SwitchFormToCreateModeHandler)
register(ISwitchFormToUpdateModeHandler.name, SwitchFormToUpdateModeHandler)
register(IValidateFieldRulesHandler.name, ValidateFieldRulesHandler)
register(IValidateFormHandler.name, ValidateFormHandler)
register(ISaveFormHandler.name, SaveFormHandler)
register(ITriggerFormNotificationHandler.name, TriggerFormNotificationHandler)
register(ITriggerFormResponseInterceptorHandler.name, TriggerFormResponseInterceptorHandler)
register(IDispatchOnSuccessFormEventHandler.name, DispatchOnSuccessFormEventHandler)
register(IDispatchOnFailedFormEventHandler.name, DispatchOnFailedFormEventHandler)
register(ILoadRemoteRecordHandler.name, LoadRemoteRecordHandler)
