import type {
  HttpRequest,
  Locale,
  NotificationState,
  PaginationStructure,
  RuleOptions,
} from '@fancy-crud/core'
import { fields, setDefaultClasses, setDefaultNotificationHandler, setFields, setHttpPagination, setHttpRequest, setLocale, setRuleOptions, setTable, setUtils } from '@fancy-crud/core'

export interface Options {
  http: {
    request?: Pick<HttpRequest, 'request'>
    pagination?: PaginationStructure
  }
  fields: Record<string, any>
  utils: Record<string, any>
  ruleOptions: RuleOptions
  table: Record<string, any>
  defaultClasses: Record<string, string>
  i18n: Locale
  notificationHandler: NotificationState
}

export function setFancyCrudConfig(options: Partial<Options>) {
  if (options.http?.request)
    setHttpRequest(options.http.request)

  if (options.http?.pagination)
    setHttpPagination(options.http.pagination)

  if (options.fields)
    setFields(options.fields)

  if (options.utils)
    setUtils(options.utils)

  if (options.table)
    setTable(options.table)

  if (options.ruleOptions)
    setRuleOptions(options.ruleOptions)

  if (options.defaultClasses)
    setDefaultClasses(options.defaultClasses)

  if (options.i18n)
    setLocale(options.i18n)

  if (options.notificationHandler)
    setDefaultNotificationHandler(options.notificationHandler)

  if (Object.keys(fields).length === 0)
    throw new Error('You should install a ui wrapper, please follow the documentation at: https://fancy-crud.github.io/docs/')
}
