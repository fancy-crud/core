import { providers } from '../axioma'

export class MapDependencies {
  execute(params: symbol[]) {
    let dependencies: any[] = []

    dependencies = params.map((dependency: any) => {
      const providerObject = providers.get(dependency)

      if (!providerObject)
        return null

      const Provider = providerObject.provider
      const dependencies = this.execute(providerObject.dependencies)

      return new Provider(...dependencies)
    }).filter((provider: any) => provider !== null)

    return dependencies
  }
}
