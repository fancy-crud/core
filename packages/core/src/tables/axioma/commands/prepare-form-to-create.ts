import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class PrepareFormToCreateCommand implements BaseCommand {
  public readonly meta = meta(IPrepareFormToCreateHandler)

  constructor(
    public readonly formId: symbol,
    public readonly options?: { onClickAux?: () => void },
  ) {}
}

export abstract class IPrepareFormToCreateHandler {
  abstract execute({ formId, options }: PrepareFormToCreateCommand): void
}
