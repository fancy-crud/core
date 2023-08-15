import type { BaseCommand } from '@/common/bus/axioma'

interface IDependency {
  isCallable(...args: any): void
}

export class Dependency implements IDependency {
  isCallable(...args: any) {
    return args.length > 0
  }
}

const DEPENDENCY = injectable('IDependency', Dependency)

export class CreateUserWithDependencyCommand implements BaseCommand {
  public readonly meta = meta(CreateUserWithDependencyHandler)

  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserWithDependencyHandler {
  constructor(private dependency: IDependency = inject(DEPENDENCY)) {}

  async execute(command: CreateUserWithDependencyCommand) {
    return this.dependency.isCallable(command)
  }
}
