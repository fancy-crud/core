import { reactive } from "vue"
import { Fields } from "@/types";
import { getFormData, normalizeFormFields } from "../form";
import type { NormalizedFields } from '@/types';

export function useFilters(_filters: Fields) {
  const filters: NormalizedFields = reactive(
    normalizeFormFields(_filters)
  )

  const filterParams = reactive(
    getFormData({ fields: filters }).jsonForm
  )

  const filterParamsStringify = computed(() => {
    return JSON.stringify(getFormData({ fields: filters }).jsonForm)
  })

  watch(filterParamsStringify, () => {
    Object.assign(filterParams, getFormData({ fields: filters }).jsonForm)
  })

  return {
    filters,
    filterParams,
    filterParamsStringify
  }
}
