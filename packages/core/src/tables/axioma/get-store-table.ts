import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { TableStoreState } from '../axioma'

export class GetStoreTableCommand implements BaseCommand {
  public readonly meta = meta(IGetStoreTableHandler)

  constructor(
    public readonly id: symbol,
  ) {}
}

export abstract class IGetStoreTableHandler {
  abstract execute({ id }: GetStoreTableCommand): TableStoreState
}
