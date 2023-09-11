export interface CommandMeta {
  Handler: (...providers: any[]) => { execute(command: any): any }
}

export interface BaseCommand {
  readonly meta: Readonly<CommandMeta>
}

export type HandlerDefinition = abstract new (...args: any[]) => { execute(command: any): any }

export type MetaReturn<T> = T extends abstract new (...args: any[]) => { execute(command: infer Args): infer A } ? { Handler: (...providers: any[]) => { execute(command: Args): A } } : unknown

export interface BusCommand extends BaseCommand { }
export interface BusHandler { new (...args: any): { execute(command: any): any } }
export interface BusHandlerInstance { execute(command: any): any }

export type CommandReturn<U extends BaseCommand> = U['meta']['Handler'] extends () => { execute(command: any): infer A } ? A : any

export type Dependencies<T> = T extends { new (...args: infer A): { execute(command: any): any } } ? { [k in keyof A]: { new (...args: A): A[k] } } : any
export type Providers<T> = T extends { new (...args: infer A): { execute(command: any): any } } ? A : any[]

export interface IBus {
  execute<U extends BusCommand>(command: U, providers?: Providers<U['meta']['Handler']>): CommandReturn<U>
}
