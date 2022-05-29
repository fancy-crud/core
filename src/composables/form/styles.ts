import { NormalizedFieldStructure } from '@/types';
import { watch, reactive } from 'vue'

export function useErrorStyles(field: NormalizedFieldStructure) {
  const state = reactive({
    borderColor: '',
    textColor: ''
  })

  watch(() => field.errors, () => {
    const borderColor = field.errors.length ? 'border-red-500' : ''
    const textColor = field.errors.length ? 'text-red-500' : ''
  
    Object.assign(state, {
      borderColor,
      textColor
    })
  })

  return state
}