import type {
  HttpHooks,
  HttpRequest,
  Locale,
  NotificationState,
  PaginationStructure,
  ResponseInterceptorState,
  RuleConfig,
} from '@packages/core/index'
import { setDefaultInterceptors, setDefaultNotificationHandler, setDefaults, setHttpHooks, setHttpPagination, setHttpRequest, setLocale, setRuleConfig } from '@packages/core/index'
import { components, setComponents } from './components'

type Button = Record<string, unknown>

export interface Config {
  http?: {
    request?: HttpRequest['request']
    pagination?: PaginationStructure
    hooks?: HttpHooks
  }
  components: Record<string, any>
  rules?: RuleConfig
  styles?: {
    mainButton?: Button
    auxButton?: Button
    addButton?: Button
    editButton?: Button
    removeButton?: Button
    dumpButton?: Button
    confirmButton?: Button
    cancelButton?: Button
    [key: string]: unknown
  }
  i18n?: Locale
  toast?: NotificationState
  responseInterceptors?: ResponseInterceptorState
}

export function setupConfig(config: Config) {
  if (config.http?.hooks)
    setHttpHooks(config.http.hooks)

  if (config.http?.request)
    setHttpRequest(config.http.request)

  if (config.http?.pagination)
    setHttpPagination(config.http.pagination)

  if (config.components)
    setComponents(config.components)

  if (config.rules)
    setRuleConfig(config.rules)

  if (config.styles)
    setDefaults(config.styles)

  if (config.i18n)
    setLocale(config.i18n)

  if (config.toast)
    setDefaultNotificationHandler(config.toast)

  if (config.responseInterceptors)
    setDefaultInterceptors(config.responseInterceptors)

  if (Object.keys(components).length === 0)
    throw new Error('You should install a ui wrapper, please follow the documentation at: https://fancy-crud.github.io/docs/')
}

export function defineConfig(config: Config): Config {
  return config
}
