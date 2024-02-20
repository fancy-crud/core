import { inject } from '@fancy-crud/bus'
import { PaginateResult } from '@packages/core/common/http/axioma'
import { HttpService } from '@packages/core/common/http/capabilities'
import type { ISetListDataHandler, SetListDataCommand } from '../axioma'
import { ITableStore } from '../axioma'

export class SetListDataHandler implements ISetListDataHandler {
  constructor(
    private tableStore: ITableStore = inject(ITableStore),
  ) {}

  execute({ tableId, data }: SetListDataCommand): void {
    const table = this.tableStore.searchById(tableId)!

    if (Array.isArray(data)) {
      table.list.data = data
      table.pagination.count = data.length
      return
    }

    const httpService = new HttpService()
    const paginateResults = new PaginateResult(httpService.pagination, data)
    const results = paginateResults.results
    const count = paginateResults.count

    table.list.data = results
    table.pagination.count = count
  }
}
