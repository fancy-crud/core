import '@packages/core/common/http/integration'
import type { HttpRequestGet, IHttp } from '@packages/core/common/http/axioma'
import { GetForeignKeyValuesCommand } from '@packages/core/common/http/axioma'
import { describe, expect, it, vi } from 'vitest'

describe('GetForeignKeyValuesHandler', () => {
  it('should call http request get method for each unique url in fields', async () => {
    // Mock IHttp and HttpRequestGet

    const get = vi.fn()
    const httpMock: Pick<IHttp, 'pagination'> & HttpRequestGet = {
      pagination: {
        results: () => [],
        count: () => 0,
      },
      request: {
        get<R=any, C=any>(_url: string, _config?: C) {
          get()
          console.log('called')
          return new Promise(
            resolve => setTimeout(() => resolve, 1000),
          )
        },
      },
    }

    const fields = {
      field1: {
        type: 'select',
        url: 'url1/',
        interceptOptions: (_options: any[]) => [],
      },
      field2: {
        type: 'select',
        url: 'url2/',
        interceptOptions: (_options: any[]) => [],
      },
    }

    const command = new GetForeignKeyValuesCommand(fields)

    // Create an instance of GetForeignKeyValuesHandler
    const handler = command.meta.Handler(httpMock)

    // Call the execute method
    handler.execute(command)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Expect the get method to be called twice with the correct urls
    expect(get).toHaveBeenCalledTimes(2)
    expect(get).toHaveBeenCalledWith('url1')
    expect(get).toHaveBeenCalledWith('url2')
  })
})

