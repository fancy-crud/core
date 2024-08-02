import { type IBaseHandler } from '@fancy-crud/bus'
import type { ParseUrlCommand } from '../axioma'
import { matchText } from '../../helpers'

export class ParseUrlHandler implements IBaseHandler<ParseUrlCommand> {
  private extractParamsFromRoute(route: string): string[] {
    const paramRegex = /:([^/]+)/g
    const params: string[] = []
    let match = paramRegex.exec(route)

    while (match !== null) {
      params.push(match[1])
      match = paramRegex.exec(route)
    }

    return params
  }

  private replaceUrlParams(url: string, params: string[], obj: Record<string, any>): string {
    return params.reduce((acc, param) => {
      const objParam = obj[param]
      if (objParam === undefined)
        throw new Error(`Param ${param} is not found in the record`)

      return acc.replace(`:${param}`, String(objParam))
    }, url)
  }

  execute({ url: rawUrl, mode, record }: ParseUrlCommand): string {
    let url = rawUrl
    const urls = matchText(url)

    url = mode === 'create' ? urls.left : urls.right

    const params = this.extractParamsFromRoute(url)

    url = this.replaceUrlParams(url, params, record || {})

    return url
  }
}
