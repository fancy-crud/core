import type { INormalizeTableListHandler, NormalizeTableListCommand, NormalizedTableList, RawTableList } from '../axioma'

export class NormalizeTableListHandler implements INormalizeTableListHandler {
  execute<T extends RawTableList>({ rawList }: NormalizeTableListCommand<T>): T & NormalizedTableList {
    return {
      data: rawList?.data || [],
      isFetching: rawList.isFetching || false,
      options: {
        autoTrigger: false,
        ...(rawList?.options || {}),
      },
    } as unknown as T & NormalizedTableList
  }
}
