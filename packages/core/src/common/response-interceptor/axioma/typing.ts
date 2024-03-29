export type ResponseInterceptor = (formId: symbol, response: any) => void

export interface ResponseInterceptorState extends Record<number, ResponseInterceptor> {}

export abstract class IResponseInterceptorStore {
  abstract save(id: symbol, payload: ResponseInterceptorState): void
  abstract searchById(id: symbol): ResponseInterceptorState | undefined
  abstract deleteById(id: symbol): void
  abstract intercept(interceptorId: symbol, formId: symbol, code: number, payload: unknown): void
}
