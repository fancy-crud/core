import isEqual from 'lodash.isequal'
import { inject } from '@fancy-crud/bus'
import { IHttp } from '../axioma/typing'
import type { HttpRequestGet, SameAPIEndpoint } from '../axioma/typing'
import { type GetForeignKeyValuesCommand, type IGetForeignKeyValuesHandler, PaginateResult } from '../axioma'

export class GetForeignKeyValuesHandler implements IGetForeignKeyValuesHandler {
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

  private addOptionsToField(field: { options?: any[]; interceptOptions: (options: any[]) => unknown[] }, data: any) {
    const options: any[] = field.options || []

    const addOptionsItems = (items: any[]) => {
      items.forEach((item) => {
        const result = options.find(option => isEqual(option, item))

        if (!result)
          options.push(item)
      })
    }

    let _data = data

    if (!Array.isArray(_data)) {
      const paginateResults = new PaginateResult(this.http.pagination, _data)
      _data = Array.isArray(paginateResults.results) ? paginateResults.results : _data
    }

    addOptionsItems(field.interceptOptions(_data))
    field.options = options
  }

  execute({ fields }: GetForeignKeyValuesCommand): void {
    const sameAPIEndpoint: SameAPIEndpoint = this.getSameAPIEndpoint(fields)

    Object.entries(sameAPIEndpoint).forEach(([url, fieldKeys]) => {
      this.http.request.get(url).then((response: any) => {
        fieldKeys.forEach(fieldKey => this.addOptionsToField(fields[fieldKey], response.data))
      })
        .catch(e => console.error(e))
    })
  }
}
