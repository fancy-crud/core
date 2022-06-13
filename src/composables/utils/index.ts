export * from './formats'

import { computed } from 'vue'

export function useDefaultBackgroundColor(defaultBgColor: string, colorContainer?: string) {
  return computed(() => {
    let bgColor = ''
    
    if (colorContainer) {
      const bgColorMatches = colorContainer.match(/(?:^|\s)bg-(\w)+([-\w\/]+)/)
  
      if (bgColorMatches && bgColorMatches.length)
        bgColor = bgColorMatches[0].trim()
    }
  
    return bgColor || defaultBgColor
  })
}