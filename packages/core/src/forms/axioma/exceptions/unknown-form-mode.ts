export class UnknownFormMode extends Error {
  constructor() {
    super('Unknown form mode. Available values are "create" or "update"')
    Object.setPrototypeOf(this, UnknownFormMode.prototype)
  }
}
