import { register } from '@packages/core/common/bus/capabilities'
import {
  ICreateFormHandler, IFilterFieldsByFormModeHandler,
  IGenerateFormDataHandler, IGetButtonLabelByFormModeHandler,
  IGetTitleByFomModeHandler, INormalizeButtonsHandler,
  INormalizeFormFieldsHandler, INormalizeSettingsHandler,
  INormalizeTitlesHandler, IResetFieldsByFormIdHandler,
  IResetFieldsHandler, ISetFieldsErrorsHandler,
  ISetFieldsValuesHandler, ISwitchFormToCreateModeHandler,
  ISwitchFormToUpdateModeHandler, IValidateFieldRulesHandler,
  IValidateFormHandler,
} from '../axioma'
import { CreateFormHandler } from '../capabilities/create-form'
import { FilterFieldsByFormModeHandler } from '../capabilities/filter-fields-by-form-mode'
import { GenerateFormDataHandler } from '../capabilities/generate-form-data'
import { GetButtonLabelByFormModeHandler } from '../capabilities/get-button-label-by-form-mode'
import { GetTitleByFomModeHandler } from '../capabilities/get-title-by-form-mode'
import { NormalizeButtonsHandler } from '../capabilities/normalize-buttons'
import { NormalizeFormFieldsHandler } from '../capabilities/normalize-fields'
import { NormalizeSettingsHandler } from '../capabilities/normalize-settings'
import { NormalizeTitlesHandler } from '../capabilities/normalize-titles'
import { ResetFieldsHandler } from '../capabilities/reset-fields'
import { ResetFieldsByFormIdHandler } from '../capabilities/reset-fields-by-form-id'
import { SetFieldsErrorsHandler } from '../capabilities/set-fields-errors'
import { SetFieldsValuesHandler } from '../capabilities/set-fields-values'
import { SwitchFormToCreateModeHandler } from '../capabilities/switch-form-to-create-mode'
import { SwitchFormToUpdateModeHandler } from '../capabilities/switch-form-to-update-mode'
import { ValidateFieldRulesHandler } from '../capabilities/validate-field-rules'
import { ValidateFormHandler } from '../capabilities/validate-form'

register(ICreateFormHandler.name, CreateFormHandler)
register(IFilterFieldsByFormModeHandler.name, FilterFieldsByFormModeHandler)
register(IGenerateFormDataHandler.name, GenerateFormDataHandler)
register(IGetButtonLabelByFormModeHandler.name, GetButtonLabelByFormModeHandler)
register(IGetTitleByFomModeHandler.name, GetTitleByFomModeHandler)
register(INormalizeButtonsHandler.name, NormalizeButtonsHandler)
register(INormalizeFormFieldsHandler.name, NormalizeFormFieldsHandler)
register(INormalizeSettingsHandler.name, NormalizeSettingsHandler)
register(INormalizeTitlesHandler.name, NormalizeTitlesHandler)
register(IResetFieldsByFormIdHandler.name, ResetFieldsByFormIdHandler)
register(IResetFieldsHandler.name, ResetFieldsHandler)
register(ISetFieldsErrorsHandler.name, SetFieldsErrorsHandler)
register(ISetFieldsValuesHandler.name, SetFieldsValuesHandler)
register(ISwitchFormToCreateModeHandler.name, SwitchFormToCreateModeHandler)
register(ISwitchFormToUpdateModeHandler.name, SwitchFormToUpdateModeHandler)
register(IValidateFieldRulesHandler.name, ValidateFieldRulesHandler)
register(IValidateFormHandler.name, ValidateFormHandler)
