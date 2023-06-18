import { LOCALES } from '../axioma'

export interface Locale {
  locale: string
  messages: Record<string, Record<string, string>>
}

export const i18n: Locale = {
  locale: 'en',
  messages: {
    ...LOCALES,
  },
}

export function setLocale(locale: Locale) {
  Object.assign(i18n, locale)
}

export function t(text: string) {
  return i18n.messages[i18n.locale][text] || text
}
