import type { FormMode } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class GetTitleByFormModeCommand implements BaseCommand {
  public readonly meta = meta(IGetTitleByFomModeHandler)

  constructor(
    public readonly mode: FormMode,
    public readonly text?: string,
  ) {}
}

export abstract class IGetTitleByFomModeHandler {
  abstract execute(command: GetTitleByFormModeCommand): string
}
