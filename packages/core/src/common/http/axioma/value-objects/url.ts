export class Url {
  private _value = ''

  constructor(private url: string, private lookupValue?: string | number) {
    this.parseUrl()
  }

  private parseUrl() {
    let result: string

    if (this.url.endsWith('/'))
      result = [this.url + String(this.lookupValue || ''), ''].join('/')

    else
      result = [this.url, String(this.lookupValue || '')].join('/')

    if (result.endsWith('//'))
      result = result.substring(0, result.length - 1)

    if (!result.endsWith('/'))
      result = `${result}/`

    this._value = result
  }

  get value() {
    return this._value
  }
}
