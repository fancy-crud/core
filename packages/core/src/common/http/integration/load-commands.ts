import { register } from '@packages/core/common/bus/capabilities'
import { IGetForeignKeyValuesHandler, IHttp, IRequestCreateHandler, IRequestDeleteHandler, IRequestListHandler, IRequestRetrieveHandler, IRequestUpdateHandler, ISaveRecordHandler } from '../axioma'
import { GetForeignKeyValuesHandler, HttpService, RequestCreateHandler, RequestDeleteHandler, RequestListHandler, RequestRetrieveHandler, RequestUpdateHandler, SaveRecordHandler } from '../capabilities'

register(IHttp.name, HttpService)
register(IGetForeignKeyValuesHandler.name, GetForeignKeyValuesHandler)
register(IRequestCreateHandler.name, RequestCreateHandler)
register(IRequestDeleteHandler.name, RequestDeleteHandler)
register(IRequestListHandler.name, RequestListHandler)
register(IRequestRetrieveHandler.name, RequestRetrieveHandler)
register(IRequestUpdateHandler.name, RequestUpdateHandler)
register(ISaveRecordHandler.name, SaveRecordHandler)
