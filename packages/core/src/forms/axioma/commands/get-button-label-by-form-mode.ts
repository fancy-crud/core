import type { FormMode } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class GetButtonLabelByFormModeCommand implements BaseCommand {
  public readonly meta = meta(IGetButtonLabelByFormModeHandler)

  constructor(
    public readonly mode: FormMode,
    public readonly text?: string,
  ) {}
}

export abstract class IGetButtonLabelByFormModeHandler {
  abstract execute({ mode, text }: GetButtonLabelByFormModeCommand): string
}
