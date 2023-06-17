import type { HttpService, RuleOptions } from '@fancy-crud/core'
import { fields, setDefaultClasses, setFields, setHttpInstance, setHttpPagination, setRuleOptions, setTable, setUtils } from '@fancy-crud/core'

export interface Options {
  http: {
    service?: Omit<HttpService, 'pagination'>
    pagination?: HttpService['pagination']
  }
  fields: Record<string, any>
  utils: Record<string, any>
  ruleOptions: RuleOptions
  table: Record<string, any>
  defaultClasses: Record<string, string>
}

export function setFancyCrudConfig(options: Partial<Options>) {
  if (options.http?.service)
    setHttpInstance(options.http.service)

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

  if (Object.keys(fields).length === 0)
    throw new Error('You should install a ui wrapper, please follow the documentation at: https://fancy-crud.github.io/docs/')
}
