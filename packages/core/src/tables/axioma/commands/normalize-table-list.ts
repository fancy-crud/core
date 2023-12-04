import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { NormalizedTableList, RawTableList } from '..'

export class NormalizeTableListCommand<T extends RawTableList> implements BaseCommand {
  public readonly meta = meta(INormalizeTableListHandler)

  constructor(
    public readonly rawList: T,
  ) {}
}

export abstract class INormalizeTableListHandler {
  abstract execute<T extends RawTableList>({ rawList }: NormalizeTableListCommand<T>): T & NormalizedTableList
}
