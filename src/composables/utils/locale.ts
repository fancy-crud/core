import { reactive, computed } from 'vue'
import en from '@/locales/en.json'

interface Locale {
  locale: string
  messages: Record<string, Record<string, string>>
}

export const i18n: Locale = reactive({
  locale: 'en',
  messages: {
    en
  }
})

export function setLocale(locale: Locale) {
  Object.assign(i18n, locale)
}

export function useLocale() {
  const t = computed(() => {
    return (text: string) => i18n.messages[i18n.locale][text] || text
  })

  return t
}