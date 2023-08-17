export class UnprocessableValidationResult extends Error {
  constructor(fieldName: string) {
    super(`Unable to validate the field ${fieldName}, rules function needs to return string or true. Otherwise you will need to process the initial return`)
    Object.setPrototypeOf(this, UnprocessableValidationResult.prototype)
  }
}
