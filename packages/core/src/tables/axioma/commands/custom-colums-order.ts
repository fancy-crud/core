import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class CustomColumnsOrderCommand<T extends Record<string, any>> implements BaseCommand {
  public readonly meta = meta(ICustomColumnsOrderHandler)

  constructor(
    public readonly columns: T,
    public readonly order: string[],
  ) {}
}

export abstract class ICustomColumnsOrderHandler implements BaseHandler {
  abstract execute<T extends Record<string, any>>(command: CustomColumnsOrderCommand<T>): T
}
