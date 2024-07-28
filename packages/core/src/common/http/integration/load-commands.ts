import { register } from '@fancy-crud/bus'
import { IGetForeignKeyValuesHandler, IHttp, IRequestCreateHandler, IRequestDeleteHandler, IRequestListHandler, IRequestRetrieveHandler, IRequestUpdateHandler, ISaveRecordHandler, ParseUrlCommand } from '../axioma'
import { GetForeignKeyValuesHandler, HttpService, ParseUrlHandler, RequestCreateHandler, RequestDeleteHandler, RequestListHandler, RequestRetrieveHandler, RequestUpdateHandler, SaveRecordHandler } from '../capabilities'

register(IHttp.name, HttpService)
register(IGetForeignKeyValuesHandler.name, GetForeignKeyValuesHandler)
register(IRequestCreateHandler.name, RequestCreateHandler)
register(IRequestDeleteHandler.name, RequestDeleteHandler)
register(IRequestListHandler.name, RequestListHandler)
register(IRequestRetrieveHandler.name, RequestRetrieveHandler)
register(IRequestUpdateHandler.name, RequestUpdateHandler)
register(ISaveRecordHandler.name, SaveRecordHandler)
register(ParseUrlCommand.name, ParseUrlHandler)
