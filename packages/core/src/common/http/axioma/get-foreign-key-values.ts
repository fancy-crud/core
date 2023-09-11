import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class GetForeignKeyValuesCommand implements BaseCommand {
  public readonly meta = meta(IGetForeignKeyValuesHandler)

  constructor(
    public readonly fields: Record<string, { type: string; options?: any[]; url?: string; filterParams?: Record<string, unknown> }>,
  ) {}
}

export abstract class IGetForeignKeyValuesHandler {
  abstract execute({ fields }: GetForeignKeyValuesCommand): void
}
