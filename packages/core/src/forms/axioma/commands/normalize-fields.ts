import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { BaseObjectWithRawFields, NormalizedFields } from '@packages/core/forms/axioma'

export type NormalizeFormFieldsCommandInputType = BaseObjectWithRawFields

export class NormalizeFormFieldsCommand<T extends NormalizeFormFieldsCommandInputType> implements BaseCommand {
  public readonly meta = meta(INormalizeFormFieldsHandler)

  constructor(
    public readonly fields: T,
  ) {}
}

/**
  A utility class that normalizes form fields by merging them with default keys and values.
  Provides a static execute method that takes an object containing form fields and returns
  a new object with normalized fields.
**/
export abstract class INormalizeFormFieldsHandler implements BaseHandler {
  /**
    Normalizes an object containing form fields by merging each field with the default keys and values.
    Returns a new object with normalized fields.
    @template T - A generic type for the form fields object.
    @param {T} fields - An object containing form fields to be normalized.
    @returns {NormalizedFields<T>} - A new object with the normalized form fields.
  **/
  abstract execute<T extends NormalizeFormFieldsCommandInputType = {}>({ fields }: NormalizeFormFieldsCommand<T>): NormalizedFields<T>
}
