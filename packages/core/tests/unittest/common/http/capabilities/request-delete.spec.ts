import '@packages/core/common/http/integration'
import { RequestDeleteCommand } from '@packages/core/common/http/axioma'
import { describe, expect, it, vi } from 'vitest'

describe('RequestDeleteHandler', () => {
  it.concurrent('should call onSuccess and onFinally when HTTP request is successful', async () => {
    const url = 'https://example.com/delete'
    const options = {
      onInit: vi.fn(),
      onSuccess: vi.fn(),
      onFailed: vi.fn(),
      onFinally: vi.fn(),
    }

    const response = { status: 200, data: 'Deleted successfully' }
    const httpService = {
      request: {
        async delete<ResponseType = any, ConfigType = any>(_url: string, _config: ConfigType): Promise<ResponseType> {
          return response as ResponseType
        },
      },
    }

    const command = new RequestDeleteCommand(url, 'fakeId', options)
    const handler = command.meta.Handler(httpService)

    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve))

    expect(options.onInit).toHaveBeenCalled()
    expect(options.onSuccess).toHaveBeenCalledWith(response)
    expect(options.onFailed).not.toHaveBeenCalled()
    expect(options.onFinally).toHaveBeenCalledWith()
  })

  it.concurrent('should call onFailed and onFinally when HTTP request fails', async () => {
    const url = 'https://example.com/delete'
    const options = {
      onInit: vi.fn(),
      onSuccess: vi.fn(),
      onFailed: vi.fn(),
      onFinally: vi.fn(),
    }

    const error = new Error('Request failed')
    const httpService = {
      request: {
        delete: () => Promise.reject(error),
      },
    }
    const command = new RequestDeleteCommand(url, 'fakeId', options)
    const handler = command.meta.Handler(httpService)

    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve))

    expect(options.onInit).toHaveBeenCalled()
    expect(options.onSuccess).not.toHaveBeenCalled()
    expect(options.onFailed).toHaveBeenCalledWith(error)
    expect(options.onFinally).toHaveBeenCalledWith()
  })
})
