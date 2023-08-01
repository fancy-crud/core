import { handlers } from '../axioma'
import { MapDependencies } from './map-dependencies'

export class Bus {
  private mapDependencies: MapDependencies = new MapDependencies()

  execute<U>(command: any): U {
    const handlerObject = handlers.get(command.constructor.name)

    if (!handlerObject)
      throw new Error(`Unable to find Handler ${command.constructor.name}`)

    const dependencies = this.mapDependencies.execute(handlerObject.dependencies)
    const Handler = handlerObject.handler

    const handlerInstance = new Handler(...dependencies)

    return handlerInstance.execute(command)
  }
}
