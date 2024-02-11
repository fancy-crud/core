import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { StandardErrorResponseStructure } from '../typing'

export class DispatchOnFailedFormEventCommand implements BaseCommand {
  public readonly meta = meta(IDispatchOnFailedFormEventHandler)

  constructor(
    public readonly formId: symbol,
    public readonly response?: Partial<StandardErrorResponseStructure>,
  ) {}
}

export abstract class IDispatchOnFailedFormEventHandler implements BaseHandler {
  abstract execute(command: DispatchOnFailedFormEventCommand): void
}
