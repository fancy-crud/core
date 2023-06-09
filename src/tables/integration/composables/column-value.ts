import { columnValue } from '@fancy-crud/core'

export function useColumnValue() {
  const getValue = computed(() => columnValue)

  return {
    getValue,
  }
}
