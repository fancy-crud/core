import { injectable } from '@packages/core/common/bus/capabilities'
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

  intercept(id: symbol, code: number, payload: unknown): ResponseInterceptorState | undefined {
    const state = this.searchById(id)

    if (!state) {
      console.error('Response interceptor state does not exist')
      return
    }

    const interceptor = state[code]

    if (!interceptor) {
      console.error('Unable to intercept response. Response interceptor code does not exist')
      return
    }

    interceptor(payload)
  }
}

injectable(IResponseInterceptorStore.name, ResponseInterceptorStoreService)
