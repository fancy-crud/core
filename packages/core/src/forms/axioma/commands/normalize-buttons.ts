import { meta } from '@fancy-crud/bus'
import type { BaseCommand } from '@fancy-crud/bus'
import type { NormalizedFormButtons, RawFormButtons } from '@packages/core/forms/axioma'

export type NormalizeButtonsInputType = RawFormButtons

export class NormalizeButtonsCommand<T extends NormalizeButtonsInputType> implements BaseCommand {
  public readonly meta = meta(INormalizeButtonsHandler)

  constructor(
    public readonly buttons?: T,
  ) {}
}

export abstract class INormalizeButtonsHandler {
  abstract execute<T extends NormalizeButtonsInputType>({ buttons }: NormalizeButtonsCommand<T>): NormalizedFormButtons
}
