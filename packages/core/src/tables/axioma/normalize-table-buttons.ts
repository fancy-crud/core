import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { NormalizedButtons, RawButton } from '@packages/core/forms/axioma'

export type NormalizeTableButtonsInputType = Record<'add' | 'edit' | 'remove', RawButton>

export class NormalizeTableButtonsCommand<T extends NormalizeTableButtonsInputType> implements BaseCommand {
  public readonly meta = meta(INormalizeTableButtonsHandler)

  constructor(
    public readonly buttons?: T,
  ) {}
}

export abstract class INormalizeTableButtonsHandler {
  abstract execute<T extends NormalizeTableButtonsInputType>({ buttons }: NormalizeTableButtonsCommand<T>): NormalizedButtons<T>
}
