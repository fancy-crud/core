import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

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
