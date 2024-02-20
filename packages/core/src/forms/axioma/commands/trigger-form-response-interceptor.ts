import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { StandardErrorResponseStructure } from '../typing'

export class TriggerFormResponseInterceptorCommand implements BaseCommand {
  public readonly meta = meta(ITriggerFormResponseInterceptorHandler)

  constructor(
    public readonly formId: symbol,
    public readonly response?: Partial<StandardErrorResponseStructure>,
    public readonly isError?: boolean,
  ) {}
}

export abstract class ITriggerFormResponseInterceptorHandler implements BaseHandler {
  abstract execute(command: TriggerFormResponseInterceptorCommand): void
}
