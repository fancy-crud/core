export interface CommandMeta {
  Handler: (...providers: any[]) => { execute(command: any): any }
}

export interface BaseCommand {
  readonly meta: Readonly<CommandMeta>
}

export interface BaseHandler<CommandType extends BaseCommand = any, ReturnType = any> {
  execute(command: CommandType): ReturnType
}

export type HandlerDefinition = abstract new (...args: any[]) => { execute(command: any): any }

export type MetaReturnHandler<T> = T extends abstract new (...args: any[]) => { execute(command: infer Args): infer A } ? { execute(command: Args): A } : { execute(command: any): any }
export interface MetaReturn<T> { Handler: (...providers: any[]) => MetaReturnHandler<T> }

export interface BusCommand extends BaseCommand { }
export interface BusHandler { new (...args: any): { execute(command: any): any } }
export interface BusHandlerInstance { execute(command: any): any }

export interface Meta<T> {
  returnType: T
}
export abstract class IBaseCommand<T = unknown> {
  $meta!: Meta<T>
}

export type CommandReturn<U extends BaseCommand> = U['meta']['Handler'] extends () => { execute(command: any): infer A } ? A : any

export type Dependencies<T> = T extends { new (...args: infer A): { execute(command: any): any } } ? { [k in keyof A]: { new (...args: A): A[k] } } : any
export type Providers<T> = T extends { new (...args: infer A): { execute(command: any): any } } ? A : any[]

export abstract class IBaseHandler<T extends IBaseCommand> {
  abstract execute(command: T): T['$meta']['returnType']
}

export interface IBus {
  execute<U extends BusCommand | IBaseCommand>(command: U, providers?: any[]): U extends IBaseCommand ? U['$meta']['returnType'] : CommandReturn<Exclude<U, IBaseCommand>>
}
