import { injectable } from '@fancy-crud/bus'
import type { ResponseInterceptorState } from '../axioma'
import { IResponseInterceptorStore, responseInterceptorStore } from '../axioma'

export class ResponseInterceptorStoreService implements IResponseInterceptorStore {
  save(id: symbol, payload: ResponseInterceptorState): void {
    const state = this.searchById(id) || {}

    Object.assign(state, payload)

    responseInterceptorStore.set(id, state)
  }

  searchById(id: symbol): ResponseInterceptorState | undefined {
    return responseInterceptorStore.get(id)
  }

  deleteById(id: symbol): void {
    responseInterceptorStore.delete(id)
  }

  intercept(interceptorId: symbol, formId: symbol, code: number, payload: unknown): void {
    const state = this.searchById(interceptorId)

    if (!state) {
      console.error('Response interceptor state does not exist')
      return
    }

    const interceptor = state[code]

    if (!interceptor)
      return

    interceptor(formId, payload)
  }
}

injectable(IResponseInterceptorStore.name, ResponseInterceptorStoreService)
