interface Dependency {
  isCallable(...args: any): void
}

export class DependencyImplementation implements Dependency {
  isCallable(...args: any) {
    return args.length > 0
  }
}

export class CreateUserWithDependencyCommand {
  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserWithDependencyHandler {
  constructor(private dependency: Dependency) {}

  async execute(command: CreateUserWithDependencyCommand) {
    return this.dependency.isCallable(command)
  }
}

const DEPENDENCY = registerProvider.execute(DependencyImplementation)
registerCommand.execute(
  CreateUserWithDependencyCommand,
  CreateUserWithDependencyHandler,
  [DEPENDENCY],
)

