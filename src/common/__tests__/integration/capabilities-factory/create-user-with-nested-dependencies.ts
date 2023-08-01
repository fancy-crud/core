interface Dependency {
  isCallable(...args: any): void
}

export class DeepDependency {
  isCallable(...args: any) {
    return args.length > 0
  }
}

export class DependencyImplementation implements Dependency {
  constructor(private deep: DeepDependency) {}

  isCallable(...args: any) {
    return this.deep.isCallable(...args)
  }
}

export class CreateUserWithNestedDependencyCommand {
  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserWithNestedDependencyHandler {
  constructor(private dependency: Dependency) {}

  async execute(command: CreateUserWithNestedDependencyCommand) {
    return this.dependency.isCallable(command)
  }
}

const DEEP_DEPENDENCY = registerProvider.execute(DeepDependency)
const DEPENDENCY = registerProvider.execute(DependencyImplementation, [DEEP_DEPENDENCY])

registerCommand.execute(
  CreateUserWithNestedDependencyCommand,
  CreateUserWithNestedDependencyHandler,
  [DEPENDENCY],
)

