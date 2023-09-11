import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { inject, injectable, meta } from '@packages/core/common/bus/capabilities'

export class Log {
  print() {
    return true
  }
}

injectable(Log)

export abstract class InjectableAbstract {
  abstract print(message?: string): boolean
}

export class InjectableService implements InjectableAbstract {
  constructor(
    private log: Log = inject(Log),
  ) {}

  print(message?: string) {
    return !!message && !!this.log.print()
  }
}

injectable('InjectableAbstract', InjectableService)

export class CapabilityCommand implements BaseCommand {
  public readonly meta = meta(CapabilityHandler)

  constructor(
    public readonly message?: string,
  ) {}
}

export class CapabilityHandler {
  constructor(
    private logger: InjectableAbstract = inject(InjectableAbstract),
  ) {}

  execute({ message }: CapabilityCommand) {
    return this.logger.print(message)
  }
}

export function execute(command: { meta: { Handler: any } }) {
  const handler = command.meta.Handler()
  return handler.execute(command)
}
