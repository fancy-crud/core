import type {
  HttpHooks,
  HttpRequest,
  Locale,
  NotificationState,
  PaginationStructure,
  RuleConfig,
} from '@packages/core/index'
import { setDefaultNotificationHandler, setDefaults, setHttpHooks, setHttpPagination, setHttpRequest, setLocale, setRuleConfig } from '@packages/core/index'
import { components, setComponents } from './components'

export interface Config {
  http?: {
    request?: HttpRequest['request']
    pagination?: PaginationStructure
    hooks?: HttpHooks
  }
  components: Record<string, any>
  rules?: RuleConfig
  styles?: Record<string, string>
  i18n?: Locale
  toast?: NotificationState
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

  if (Object.keys(components).length === 0)
    throw new Error('You should install a ui wrapper, please follow the documentation at: https://fancy-crud.github.io/docs/')
}

export function defineConfig(config: Config): Config {
  return config
}
