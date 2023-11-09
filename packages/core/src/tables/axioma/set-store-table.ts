import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { TableStoreState } from '../axioma'

export class SetStoreTableCommand implements BaseCommand {
  public readonly meta = meta(ISetStoreTableHandler)

  constructor(
    public readonly id: symbol,
    public readonly state: TableStoreState,
  ) {}
}

export abstract class ISetStoreTableHandler {
  abstract execute({ id, state }: SetStoreTableCommand): void
}
