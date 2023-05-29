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

    this._value = result.replaceAll('//', '/')
  }

  get value() {
    return this._value
  }
}
