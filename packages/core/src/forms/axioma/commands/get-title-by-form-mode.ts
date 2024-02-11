import type { FormMode } from '@packages/core/forms/axioma'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class GetTitleByFormModeCommand implements BaseCommand {
  public readonly meta = meta(IGetTitleByFomModeHandler)

  constructor(
    public readonly mode: FormMode,
    public readonly text?: string,
  ) {}
}

export abstract class IGetTitleByFomModeHandler implements BaseHandler {
  abstract execute(command: GetTitleByFormModeCommand): string
}
