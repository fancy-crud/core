import type { BaseCommand } from '@packages/bus/axioma'
import { inject, injectable, meta } from '@packages/bus/capabilities'

interface Dependency {
  isCallable(...args: any): void
}

export class DeepDependency {
  isCallable(...args: any) {
    return args.length > 0
  }
}

const DEEP_DEPENDENCY = injectable(DeepDependency)

export class DependencyImplementation implements Dependency {
  constructor(private deep: DeepDependency = inject(DEEP_DEPENDENCY)) {}

  isCallable(...args: any) {
    return this.deep.isCallable(...args)
  }
}

const DEPENDENCY = injectable('Dependency', DependencyImplementation)

export class CreateUserWithNestedDependencyCommand implements BaseCommand {
  public readonly meta = meta(CreateUserWithNestedDependencyHandler)
  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserWithNestedDependencyHandler {
  constructor(private dependency: Dependency = inject(DEPENDENCY)) {}

  async execute(command: CreateUserWithNestedDependencyCommand) {
    return this.dependency.isCallable(command)
  }
}
