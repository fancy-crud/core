interface IDependency {
  isCallable(...args: any): boolean
}

export class ThirdDependencyLevel {
  isCallable(...args: any): boolean {
    return args.length > 0
  }
}

export class SecondDependencyLevel {
  constructor(private thirdDependencyLevel: ThirdDependencyLevel) {}

  isCallable(...args: any): boolean {
    return this.thirdDependencyLevel.isCallable(...args)
  }
}

export class Dependency implements IDependency {
  constructor(private secondDependencyLevel: SecondDependencyLevel) {}

  isCallable(...args: any) {
    return this.secondDependencyLevel.isCallable(...args)
  }
}
