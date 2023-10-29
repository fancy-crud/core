import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import type { BaseObjectWithRawFields, Form, RawButton, RawSetting } from './typing'

/**
 * A class that provides functionality to create a form from raw fields and settings.
 */
export class CreateFormCommand<T extends BaseObjectWithRawFields, U extends RawSetting, V extends Record<'main' | 'aux', RawButton>> implements BaseCommand {
  public readonly meta = meta(ICreateFormHandler)

  constructor(
    public readonly id: string,
    public readonly rawFields: T,
    public readonly rawButtons?: V,
    public readonly rawSettings?: U,
  ) {}
}

export abstract class ICreateFormHandler {
  /**
   * Creates a form from raw fields and settings.
   *
   * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
   * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
   * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
   * @returns A `Form` object containing the normalized fields and settings.
   */
  abstract execute<T extends BaseObjectWithRawFields, U extends RawSetting, V extends Record<'main' | 'aux', RawButton>>({ id, rawFields, rawSettings, rawButtons }: CreateFormCommand<T, U, V>): Form<T, V>
}
