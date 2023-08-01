import { registerCommand, registerProvider } from '@/common/bus/capabilities'

registerCommand.execute(CatchErrorsCommand, CatchErrorsHandler)
registerCommand.execute(FillWithRecordValuesCommand, FillWithRecordValuesHandler)
registerCommand.execute(ResetFieldsCommand, ResetFieldsHandler)
registerCommand.execute(GenerateFormDataCommand, GenerateFormDataHandler)

const VALIDATE_FIELD_RULES_PROVIDER = registerProvider.execute(ValidateFieldRulesHandler)
registerCommand.execute(ValidateFieldRulesCommand, ValidateFieldRulesHandler)
registerCommand.execute(ValidateFormCommand, ValidateFormHandler, [VALIDATE_FIELD_RULES_PROVIDER])

