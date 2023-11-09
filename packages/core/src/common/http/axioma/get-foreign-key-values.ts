import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class GetForeignKeyValuesCommand implements BaseCommand {
  public readonly meta = meta(IGetForeignKeyValuesHandler)

  constructor(
    public readonly fields: Record<string, { type: string; options?: any[]; url?: string; filterParams?: Record<string, unknown> }>,
  ) {}
}

export abstract class IGetForeignKeyValuesHandler {
  abstract execute({ fields }: GetForeignKeyValuesCommand): void
}
