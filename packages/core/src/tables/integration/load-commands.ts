import { register } from '@fancy-crud/bus'
import {
  ICreateTableHandler, IDeleteRecordHandler,
  IFetchListDataHandler,
  IGetColumnValueHandler,
  INormalizeColumnsHandler,
  INormalizePaginationHandler, INormalizeTableButtonsHandler, INormalizeTableFiltersHandler,
  INormalizeTableListHandler,
  INormalizeTableSettingsHandler, IPrepareFormToCreateHandler,
  IPrepareFormToUpdateHandler,
  IResetTablePaginationHandler,
  ISetListDataHandler,
  IUpdateRowValueHandler,
} from '../axioma'
import { CreateTableHandler, DeleteRecordHandler, GetColumnValueHandler, NormalizeColumnsHandler, NormalizePaginationHandler, NormalizeTableButtonsHandler, NormalizeTableFiltersHandler, NormalizeTableListHandler, NormalizeTableSettingsHandler, PrepareFormToCreateHandler, PrepareFormToUpdateHandler, ResetTablePaginationHandler, SetListDataHandler, UpdateRowValueHandler } from '../capabilities'
import { FetchListDataHandler } from '../capabilities/fetch-list-data'

register(IGetColumnValueHandler.name, GetColumnValueHandler)
register(ICreateTableHandler.name, CreateTableHandler)
register(IDeleteRecordHandler.name, DeleteRecordHandler)

register(INormalizeColumnsHandler.name, NormalizeColumnsHandler)
register(INormalizePaginationHandler.name, NormalizePaginationHandler)
register(INormalizeTableFiltersHandler.name, NormalizeTableFiltersHandler)
register(INormalizeTableSettingsHandler.name, NormalizeTableSettingsHandler)
register(INormalizeTableButtonsHandler.name, NormalizeTableButtonsHandler)
register(INormalizeTableListHandler.name, NormalizeTableListHandler)
register(IResetTablePaginationHandler.name, ResetTablePaginationHandler)
register(ISetListDataHandler.name, SetListDataHandler)
register(IFetchListDataHandler.name, FetchListDataHandler)
register(IPrepareFormToCreateHandler.name, PrepareFormToCreateHandler)
register(IPrepareFormToUpdateHandler.name, PrepareFormToUpdateHandler)

register(IUpdateRowValueHandler.name, UpdateRowValueHandler)

