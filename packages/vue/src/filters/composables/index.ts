export function useFilters<T extends Record<string, unknown>>(_filters: T) {
  const filters = reactive({}) as T

  Object.assign(filters, {})

  const filterParams = reactive({})

  const filterParamsStringify = computed(() => {
    return JSON.stringify({})
  })

  watch(filterParamsStringify, () => {
    Object.assign(filterParams, {})
  })

  return {
    filters,
    filterParams,
    filterParamsStringify,
  }
}
