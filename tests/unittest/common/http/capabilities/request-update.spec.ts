import { RequestUpdateCommand } from '@packages/core/common/http/capabilities'

describe('RequestUpdateHandler', () => {
  it.concurrent('should call onSuccess and onFinally when HTTP request is successful', async () => {
    const url = 'https://example.com/update'
    const form = {}
    const options = {
      onInit: vi.fn(),
      onSuccess: vi.fn(),
      onFailed: vi.fn(),
      onFinally: vi.fn(),
    }

    const response = { status: 200, data: 'Updated successfully' }
    const httpService = {
      request: {
        async patch<DataType, ResponseType = any, ConfigType = any>(_url: string, _data: DataType, _config: ConfigType): Promise<ResponseType> {
          return response as ResponseType
        },
      },
    }

    const command = new RequestUpdateCommand(url, 'fakeId', form, options)
    const handler = new command.meta.Handler(httpService)

    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve))

    expect(options.onInit).toHaveBeenCalled()
    expect(options.onSuccess).toHaveBeenCalledWith(response)
    expect(options.onFailed).not.toHaveBeenCalled()
    expect(options.onFinally).toHaveBeenCalledWith()
  })

  it.concurrent('should call onFailed and onFinally when HTTP request fails', async () => {
    const url = 'https://example.com/update'
    const form = {}
    const options = {
      onInit: vi.fn(),
      onSuccess: vi.fn(),
      onFailed: vi.fn(),
      onFinally: vi.fn(),
    }

    const error = new Error('Request failed')
    const httpService = {
      request: {
        patch: () => Promise.reject(error),
      },
    }
    const command = new RequestUpdateCommand(url, 'fakeId', form, options)
    const handler = new command.meta.Handler(httpService)

    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve))

    expect(options.onInit).toHaveBeenCalled()
    expect(options.onSuccess).not.toHaveBeenCalled()
    expect(options.onFailed).toHaveBeenCalledWith(error)
    expect(options.onFinally).toHaveBeenCalledWith()
  })
})
