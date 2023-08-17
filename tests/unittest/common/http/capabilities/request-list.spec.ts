import { RequestListCommand } from '@packages/core/common/http/capabilities'

describe('RequestListHandler', () => {
  it.concurrent('should call onSuccess and onFinally when HTTP request is successful', async () => {
    const url = 'https://example.com/list'
    const options = {
      onInit: vi.fn(),
      onSuccess: vi.fn(),
      onFailed: vi.fn(),
      onFinally: vi.fn(),
    }

    const response = { status: 200, data: 'Listed successfully' }
    const httpService = {
      request: {
        async get<ResponseType = any, ConfigType = any>(_url: string, _config: ConfigType): Promise<ResponseType> {
          return response as ResponseType
        },
      },
    }

    const command = new RequestListCommand(url, {}, options)
    const handler = new command.meta.Handler(httpService)

    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve))

    expect(options.onInit).toHaveBeenCalled()
    expect(options.onSuccess).toHaveBeenCalledWith(response)
    expect(options.onFailed).not.toHaveBeenCalled()
    expect(options.onFinally).toHaveBeenCalledWith()
  })

  it.concurrent('should call onFailed and onFinally when HTTP request fails', async () => {
    const url = 'https://example.com/list'
    const options = {
      onInit: vi.fn(),
      onSuccess: vi.fn(),
      onFailed: vi.fn(),
      onFinally: vi.fn(),
    }

    const error = new Error('Request failed')
    const httpService = {
      request: {
        get: () => Promise.reject(error),
      },
    }
    const command = new RequestListCommand(url, {}, options)
    const handler = new command.meta.Handler(httpService)

    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve))

    expect(options.onInit).toHaveBeenCalled()
    expect(options.onSuccess).not.toHaveBeenCalled()
    expect(options.onFailed).toHaveBeenCalledWith(error)
    expect(options.onFinally).toHaveBeenCalledWith()
  })
})
