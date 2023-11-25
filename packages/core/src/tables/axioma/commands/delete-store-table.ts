import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class DeleteStoreTableCommand implements BaseCommand {
  public readonly meta = meta(IDeleteStoreTableHandler)

  constructor(
    public readonly id: symbol,
  ) {}
}

export abstract class IDeleteStoreTableHandler {
  abstract execute({ id }: DeleteStoreTableCommand): void
}
