import { ResponseManagerHandler } from '@/forms/capabilities'

describe('ResponseManagerHandler', () => {
  let responseManagerHandler: ResponseManagerHandler
  let id: symbol

  beforeEach(() => {
    id = Symbol('responseManagerHandler')
    responseManagerHandler = new ResponseManagerHandler(id)
  })

  it('should return the correct response handler for a given code', () => {
    const responseHandler1 = vi.fn()
    const responseHandler2 = vi.fn()
    const responseHandler3 = vi.fn()

    const responseMap1 = {
      200: responseHandler1,
      404: responseHandler2,
    }

    const responseMap2 = {
      500: responseHandler3,
    }

    responseManagerHandler.setResponseHandler(responseMap1)
    responseManagerHandler.setResponseHandler(responseMap2)

    expect(responseManagerHandler.getResponseHandler(200)).toBe(responseHandler1)
    expect(responseManagerHandler.getResponseHandler(404)).toBe(responseHandler2)
    expect(responseManagerHandler.getResponseHandler(500)).toBe(responseHandler3)
    expect(responseManagerHandler.getResponseHandler(501)).toBeNull()
  })

  it('should remove response handlers correctly', () => {
    const responseHandler1 = vi.fn()
    const responseMap = {
      200: responseHandler1,
    }

    responseManagerHandler.setResponseHandler(responseMap)
    responseManagerHandler.removeResponseHandlers()

    expect(responseManagerHandler.getResponseHandler(200)).toBeNull()
  })
})
