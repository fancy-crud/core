import type { ResponseInterceptorState } from './typing'

export const responseInterceptorStore = new Map<symbol, ResponseInterceptorState>()
