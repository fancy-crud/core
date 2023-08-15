export interface BusCommand { new (...args: any[]): any }
export interface BusHandler<T = any> { new (...args: any): { execute(command: any): T } }
export interface BusHandlerInstance<T> { execute(command: any): T }

export interface CommandMeta<HandlerClass extends BusHandler> {
  Handler: HandlerClass
}

export interface BaseCommand {
  readonly meta: Readonly<CommandMeta<any>>
}

export interface Meta<T extends BusHandler> extends Readonly<CommandMeta<T>> {}

export interface BusCommandMeta<T extends BusHandler = { new (...args: any): BusHandlerInstance<any> }> { meta: CommandMeta<T> }
export type BusCommandMetaReturnType<U extends BusCommandMeta> = U['meta']['Handler'] extends { new (...args: any): { execute(command: any): infer A } } ? A : unknown

export type Dependencies<T> = T extends { new (...args: infer A): { execute(command: any): any } } ? { [k in keyof A]: { new (...args: A): A[k] } } : any
export type Providers<T> = T extends { new (...args: infer A): { execute(command: any): any } } ? A : any[]

export interface IBus {
  execute<U extends BusCommandMeta>(command: U, providers?: Providers<U['meta']['Handler']>): BusCommandMetaReturnType<U>
}
