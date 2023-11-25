import { meta } from '@fancy-crud/bus'
import type { BaseCommand } from '@fancy-crud/bus'
import type { NormalizedButtons, RawButton } from '@packages/core/forms/axioma'

export type NormalizeButtonsInputType = Record<'main' | 'aux', RawButton>

export class NormalizeButtonsCommand<T extends NormalizeButtonsInputType> implements BaseCommand {
  public readonly meta = meta(INormalizeButtonsHandler)

  constructor(
    public readonly buttons?: T,
  ) {}
}

export abstract class INormalizeButtonsHandler {
  abstract execute<T extends NormalizeButtonsInputType>({ buttons }: NormalizeButtonsCommand<T>): NormalizedButtons<T>
}
