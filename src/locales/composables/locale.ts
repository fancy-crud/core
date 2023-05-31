import en from '../assets/en.json'

export interface Locale {
  locale: string
  messages: Record<string, Record<string, string>>
}

export const i18n: Locale = {
  locale: 'en',
  messages: {
    en,
  },
}

export function setLocale(locale: Locale) {
  Object.assign(i18n, locale)
}

export function t(text: string) {
  return i18n.messages[i18n.locale][text] || text
}
