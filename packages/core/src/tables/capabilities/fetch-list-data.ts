import { Bus, inject } from '@fancy-crud/bus'
import { RequestListCommand } from '@packages/core/common/http/axioma'
import type { StandardResponseStructure } from '@packages/core/forms/axioma'
import type { FetchListDataCommand, IFetchListDataHandler } from '../axioma'
import { ITableStore, SetListDataCommand } from '../axioma'

export class FetchListDataHandler implements IFetchListDataHandler {
  constructor(
    private tableStore: ITableStore = inject(ITableStore),
    private bus = new Bus(),
  ) {}

  execute({ tableId, page, options }: FetchListDataCommand): void {
    const table = this.tableStore.searchById(tableId)!

    table.list.isFetching = true
    const params = {
      limit: table.pagination.rowsPerPage,
      offset: 0,
      ...table.filterParams,
    }

    const offset = (page - 1) * params.limit

    if (offset > 0)
      params.offset = offset

    const onSuccess = (response: StandardResponseStructure) => {
      this.bus.execute(
        new SetListDataCommand(tableId, response.data),
      )

      if (typeof options?.onSuccess === 'function')
        options?.onSuccess(response)
    }

    this.bus.execute(new RequestListCommand(table.settings.url, params, {
      ...options,

      onSuccess,

      onFinally() {
        table.list.isFetching = false
        if (typeof options?.onFinally === 'function')
          options.onFinally()
      },
    }))
  }
}
