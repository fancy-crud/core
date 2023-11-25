import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { TableStoreState } from '..'

export class GetStoreTableCommand implements BaseCommand {
  public readonly meta = meta(IGetStoreTableHandler)

  constructor(
    public readonly id: symbol,
  ) {}
}

export abstract class IGetStoreTableHandler {
  abstract execute({ id }: GetStoreTableCommand): TableStoreState
}
