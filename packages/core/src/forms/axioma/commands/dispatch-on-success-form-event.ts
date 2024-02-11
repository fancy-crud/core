import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { StandardErrorResponseStructure } from '../typing'

export class DispatchOnSuccessFormEventCommand implements BaseCommand {
  public readonly meta = meta(IDispatchOnSuccessFormEventHandler)

  constructor(
    public readonly formId: symbol,
    public readonly response?: Partial<StandardErrorResponseStructure>,
  ) {}
}

export abstract class IDispatchOnSuccessFormEventHandler implements BaseHandler {
  abstract execute(command: DispatchOnSuccessFormEventCommand): void
}
