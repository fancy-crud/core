import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { NormalizedTableButtons, RawTableButtons } from '../typing/buttons'

export class NormalizeTableButtonsCommand<T extends RawTableButtons> implements BaseCommand {
  public readonly meta = meta(INormalizeTableButtonsHandler)

  constructor(
    public readonly buttons?: T,
  ) {}
}

export abstract class INormalizeTableButtonsHandler implements BaseHandler {
  abstract execute<T extends RawTableButtons>({ buttons }: NormalizeTableButtonsCommand<T>): NormalizedTableButtons
}
