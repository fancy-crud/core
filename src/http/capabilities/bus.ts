import { SaveRecordCommand, SaveRecordHandler } from './save-record'
import { RequestDeleteCommand, RequestDeleteHandler } from './request-delete'
import { RequestRetrieveCommand, RequestRetrieveHandler } from './request-retrieve'
import { RequestUpdateCommand, RequestUpdateHandler } from './request-update'
import { GetForeignKeyValuesCommand, GetForeignKeyValuesHandler } from './get-foreign-key-values'
import { RequestCreateCommand, RequestCreateHandler } from './request-create'
import { registerCommand } from '@/common/bus/capabilities'

registerCommand.execute(GetForeignKeyValuesCommand, GetForeignKeyValuesHandler)
registerCommand.execute(RequestCreateCommand, RequestCreateHandler)
registerCommand.execute(RequestRetrieveCommand, RequestRetrieveHandler)
registerCommand.execute(RequestUpdateCommand, RequestUpdateHandler)
registerCommand.execute(RequestDeleteCommand, RequestDeleteHandler)
registerCommand.execute(SaveRecordCommand, SaveRecordHandler)
