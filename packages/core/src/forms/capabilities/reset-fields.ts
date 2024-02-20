import type { IResetFieldsHandler, ResetFieldsCommand } from '../axioma'

export class ResetFieldsHandler implements IResetFieldsHandler {
  execute({ clonedFields, originalFields }: ResetFieldsCommand): void {
    Object.entries(originalFields).forEach(([fieldKey, field]) => {
      Object.assign(clonedFields[fieldKey], field)
    })
  }
}
