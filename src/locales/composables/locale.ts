import type { Locale } from '@fancy-crud/core'
import { i18n as defaultI18n, t as translate } from '@fancy-crud/core'

export const i18n: Locale = reactive(defaultI18n)

export function setLocale(locale: Locale) {
  Object.assign(i18n, locale)
}

export function useLocale() {
  const t = computed(() => translate)

  return t
}
