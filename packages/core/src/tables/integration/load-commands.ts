import { register } from '../..'
import {
  ICreateTableHandler, IDeleteRecordHandler,
  IDeleteStoreTableHandler, IGetColumnValueHandler,
  IGetStoreTableHandler, INormalizeColumnsHandler,
  INormalizePaginationHandler, INormalizeTableFiltersHandler,
  INormalizeTableSettingsHandler, IPrepareFormToCreateHandler,
  IPrepareFormToUpdateHandler, ISetStoreTableHandler,
  ISetStoreTableManagerHandler, IUpdateRowValueHandler,
} from '../axioma'
import { CreateTableHandler, DeleteRecordHandler, DeleteStoreTableHandler, GetColumnValueHandler, GetStoreTableHandler, NormalizeColumnsHandler, NormalizePaginationHandler, NormalizeTableFiltersHandler, NormalizeTableSettingsHandler, PrepareFormToCreateHandler, PrepareFormToUpdateHandler, SetStoreTableHandler, SetStoreTableManagerHandler, UpdateRowValueHandler } from '../capabilities'

register(IGetColumnValueHandler.name, GetColumnValueHandler)
register(ICreateTableHandler.name, CreateTableHandler)
register(IDeleteRecordHandler.name, DeleteRecordHandler)
register(IDeleteStoreTableHandler.name, DeleteStoreTableHandler)
register(IGetStoreTableHandler.name, GetStoreTableHandler)
register(INormalizeColumnsHandler.name, NormalizeColumnsHandler)
register(INormalizePaginationHandler.name, NormalizePaginationHandler)
register(INormalizeTableFiltersHandler.name, NormalizeTableFiltersHandler)
register(INormalizeTableSettingsHandler.name, NormalizeTableSettingsHandler)
register(IPrepareFormToCreateHandler.name, PrepareFormToCreateHandler)
register(IPrepareFormToUpdateHandler.name, PrepareFormToUpdateHandler)
register(ISetStoreTableManagerHandler.name, SetStoreTableManagerHandler)
register(ISetStoreTableHandler.name, SetStoreTableHandler)
register(IUpdateRowValueHandler.name, UpdateRowValueHandler)
