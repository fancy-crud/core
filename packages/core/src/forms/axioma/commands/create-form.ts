import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { ResponseInterceptorState } from '@packages/core/common/response-interceptor/axioma'
import type { NotificationState } from '@packages/core/common/notifications/axioma'
import type { BaseObjectWithRawFields, Form, RawFormButtons, RawSetting, RecordObject, RecordObjectValue } from '../typing'
import type { RuleConfigState } from '../store'

export class CreateFormCommand<
  T extends BaseObjectWithRawFields,
  U extends RawSetting,
  V extends RawFormButtons,
  RecordObjectValueType extends RecordObjectValue = RecordObjectValue,
> implements BaseCommand {
  public readonly meta = meta(ICreateFormHandler)
  public readonly record: RecordObject<RecordObjectValueType>

  constructor(
    public readonly id: string,
    public readonly rawFields: T,
    public readonly rawButtons?: V,
    public readonly rawSettings?: U,
    public readonly responseInterceptor?: ResponseInterceptorState,
    public readonly notifications?: NotificationState,
    public readonly rulesConfig?: RuleConfigState,
    record?: RecordObject<RecordObjectValueType>,
  ) {
    const DEFAULT_VALUE = { value: null }
    if (!Object.keys(record?.value ?? {}).length)
      this.record = DEFAULT_VALUE
    else
      this.record = record ?? DEFAULT_VALUE
  }
}

export abstract class ICreateFormHandler implements BaseHandler {
  abstract execute<
    T extends BaseObjectWithRawFields,
    U extends RawSetting,
    V extends RawFormButtons,
    RecordObjectValueType extends RecordObjectValue = RecordObjectValue,
  >(command: CreateFormCommand<T, U, V, RecordObjectValueType>): Form<T, V, RecordObjectValueType>
}
