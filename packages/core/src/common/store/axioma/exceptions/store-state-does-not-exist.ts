export class StoreStateDoesNotExist extends Error {
  constructor(id: symbol) {
    super(`Unable to found Store element with id(${String(id)})`)
    Object.setPrototypeOf(this, StoreStateDoesNotExist.prototype)
  }
}
