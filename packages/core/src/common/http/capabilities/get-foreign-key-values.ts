import isEqual from 'lodash.isequal'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { inject, meta } from '@packages/core/common/bus/capabilities'
import { IHttp } from '../axioma/typing'
import type { HttpRequestGet, SameAPIEndpoint } from '../axioma/typing'
import { PaginateResult } from '../axioma/value-objects/pagination'

export class GetForeignKeyValuesCommand implements BaseCommand {
  public readonly meta = meta(GetForeignKeyValuesHandler)

  constructor(
    public readonly fields: Record<string, { type: string; options?: any[]; url?: string; filterParams?: Record<string, unknown> }>,
  ) {}
}

class GetForeignKeyValuesHandler {
  constructor(private http: Pick<IHttp, 'pagination'> & HttpRequestGet = inject(IHttp)) {}

  private getSameAPIEndpoint(fields: Record<string, { url?: string; filterParams?: Record<string, unknown> }>): SameAPIEndpoint {
    const fieldsEntries = Object.entries(fields)
    const sameAPIEndpoint: SameAPIEndpoint = {}
    fieldsEntries.forEach(([fieldKey, field]) => {
      if (!field.url)
        return false

      const fieldUrl = field.url
      const fieldParams = field.filterParams || {}

      let stringFieldParams = (
        new URLSearchParams(fieldParams as Record<string, string>)
      ).toString()

      stringFieldParams = stringFieldParams.split('&').sort().join('&')

      let urlTracked = fieldUrl

      if (stringFieldParams)
        urlTracked = `${fieldUrl}?${stringFieldParams}`

      const isUrlTracked = Object.prototype.hasOwnProperty.call(sameAPIEndpoint, urlTracked)

      if (!isUrlTracked)
        sameAPIEndpoint[urlTracked] = []

      sameAPIEndpoint[urlTracked].push(fieldKey)
      return true
    })

    return sameAPIEndpoint
  }

  private addOptionsToField(field: { options?: any[] }, data: any) {
    const options: any[] = field.options || []

    const addOptionsItems = (items: any[]) => {
      items.forEach((item) => {
        const result = options.find(option => isEqual(option, item))

        if (!result)
          options.push(item)
      })
    }

    if (Array.isArray(data)) {
      addOptionsItems(data)
    }
    else {
      const paginateResults = new PaginateResult(this.http.pagination, data)
      addOptionsItems(paginateResults.results)
    }
    return options
  }

  execute({ fields }: GetForeignKeyValuesCommand): void {
    const sameAPIEndpoint: SameAPIEndpoint = this.getSameAPIEndpoint(fields)

    Object.entries(sameAPIEndpoint).forEach(([url, fieldKeys]) => {
      this.http.request.get(url).then((response: any) => {
        fieldKeys.forEach((fieldKey) => {
          fields[fieldKey].options = this.addOptionsToField(fields[fieldKey], response.data)
        })
      })
        .catch(e => console.error(e))
    })
  }
}
