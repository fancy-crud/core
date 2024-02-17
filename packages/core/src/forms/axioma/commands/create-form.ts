import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { ResponseInterceptorState } from '@packages/core/common/response-interceptor/axioma'
import type { NotificationState } from '@packages/core/common/notifications/axioma'
import type { BaseObjectWithRawFields, Form, RawFormButtons, RawSetting } from '../typing'
import type { RuleConfigState } from '../store'

export class CreateFormCommand<
  T extends BaseObjectWithRawFields,
  U extends RawSetting,
  V extends RawFormButtons,
> implements BaseCommand {
  public readonly meta = meta(ICreateFormHandler)

  constructor(
    public readonly id: string,
    public readonly rawFields: T,
    public readonly rawButtons?: V,
    public readonly rawSettings?: U,
    public readonly responseInterceptor?: ResponseInterceptorState,
    public readonly notifications?: NotificationState,
    public readonly rulesConfig?: RuleConfigState,
  ) {}
}

export abstract class ICreateFormHandler implements BaseHandler {
  abstract execute<
    T extends BaseObjectWithRawFields,
    U extends RawSetting,
    V extends RawFormButtons,
  >(command: CreateFormCommand<T, U, V>): Form<T, V>
}
