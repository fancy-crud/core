import type { Row } from '@packages/core/tables/axioma'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class PrepareFormToUpdateCommand implements BaseCommand {
  public readonly meta = meta(IPrepareFormToUpdateHandler)

  constructor(
    public readonly formId: symbol,
    public readonly row: Row,
    public readonly tableSettings: { url: string; lookupField: string },
    public readonly options?: { onClickAux?: () => void; onReady?: () => void },
  ) {}
}

export abstract class IPrepareFormToUpdateHandler implements BaseHandler {
  abstract execute({ formId, options, tableSettings, row }: PrepareFormToUpdateCommand): void
}
