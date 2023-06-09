import type { Fields, NormalizedFields } from '@/forms'

export function useFilters<T>(_filters: Fields<T>) {
  const filters = reactive({}) as NormalizedFields<T>

  Object.assign(filters, normalizeFormFields<T>(_filters))

  const filterParams = reactive(
    getFormData(filters).jsonForm,
  )

  const filterParamsStringify = computed(() => {
    return JSON.stringify(getFormData(filters).jsonForm)
  })

  watch(filterParamsStringify, () => {
    Object.assign(filterParams, getFormData(filters).jsonForm)
  })

  return {
    filters,
    filterParams,
    filterParamsStringify,
  }
}
