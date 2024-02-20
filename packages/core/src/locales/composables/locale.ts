import type { Locale } from '../axioma'
import { LOCALES } from '../axioma'

export const i18n: Locale = {
  locale: 'en',
  messages: {
    ...LOCALES,
  },
}

export function setLocale(locale: Partial<Locale>) {
  Object.assign(i18n, {
    ...locale,
    messages: {
      ...i18n.messages,
      ...locale.messages,
    },
  })
}

export function t(text: string) {
  return i18n.messages[i18n.locale][text] || text
}
