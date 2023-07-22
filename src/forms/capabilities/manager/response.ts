import type { Handler, ManagerMap, ResponseManager, ResponseMap } from '@/forms/axioma'

export class ResponseManagerHandler implements ResponseManager {
  private static map: ManagerMap<ResponseMap>

  constructor(private id: symbol) {}

  private getResponseHandlerFromMap() {
    if (!ResponseManagerHandler.map.get(this.id))
      ResponseManagerHandler.map.set(this.id, {})

    return ResponseManagerHandler.map.get(this.id)!
  }

  static setManagerMap(managerMap: ManagerMap<ResponseMap>) {
    ResponseManagerHandler.map = managerMap
  }

  setResponseHandler(codes: ResponseMap) {
    Object.assign(this.getResponseHandlerFromMap(), codes)
  }

  getResponseHandler(code: number): Handler | null {
    return this.getResponseHandlerFromMap()[code] || null
  }

  removeResponseHandlers() {
    ResponseManagerHandler.map.delete(this.id)
  }
}
