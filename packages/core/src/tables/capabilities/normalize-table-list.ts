import type { INormalizeTableListHandler, NormalizeTableListCommand, NormalizedTableList, RawTableList } from '../axioma'

export class NormalizeTableListHandler implements INormalizeTableListHandler {
  execute<T extends RawTableList>({ rawList }: NormalizeTableListCommand<T>): T & NormalizedTableList {
    const options = rawList?.options || {}

    return {
      data: rawList?.data || [],
      isFetching: rawList.isFetching || false,
      options: {
        autoTrigger: true,
        ...options,
      },
      fetchData() {},
    } as unknown as T & NormalizedTableList
  }
}
