import type { BusHandler } from '../typing'

export const handlers = new Map<string, { handler: BusHandler; dependencies: symbol[] }>()
export const providers = new Map<symbol, { provider: any; dependencies: symbol[] }>()
