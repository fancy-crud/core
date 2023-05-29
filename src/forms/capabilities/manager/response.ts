import type { Handler, ResponseManager, ResponseMap } from '@/forms/axioma'

const responseHandlers = new Map<symbol, ResponseMap>()

export class ResponseManagerHandler implements ResponseManager {
  constructor(private id: symbol) {}

  private getResponseHandlerFromMap() {
    if (!responseHandlers.get(this.id))
      responseHandlers.set(this.id, {})

    return responseHandlers.get(this.id)!
  }

  setResponseHandler(codes: ResponseMap) {
    Object.assign(this.getResponseHandlerFromMap(), codes)
  }

  getResponseHandler(code: number): Handler | null {
    return this.getResponseHandlerFromMap()[code] || null
  }

  removeResponseHandlers() {
    responseHandlers.delete(this.id)
  }
}
