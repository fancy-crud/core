import _ from 'lodash'
import type { HttpService, SameAPIEndpoint } from '../typing'
import { PaginateResult } from '../value-objects/pagination'

export class GetForeignKeyValues {
  constructor(private http: HttpService) {}

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
        const result = options.find(option => _.isEqual(option, item))

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

  execute(fields: Record<string, { type: string; options?: any[]; url?: string; filterParams?: Record<string, unknown> }>) {
    const sameAPIEndpoint: SameAPIEndpoint = this.getSameAPIEndpoint(fields)

    Object.entries(sameAPIEndpoint).forEach(([url, fieldKeys]) => {
      this.http.get(url).then((response: any) => {
        fieldKeys.forEach((fieldKey) => {
          fields[fieldKey].options = this.addOptionsToField(fields[fieldKey], response.data)
        })
      })
        .catch(e => console.error(e))
    })
  }
}
