<template>
  <div :class="wrapClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, useAttrs } from 'vue'
import type { NormalizedFieldStructure } from '@/types'

const field = computed(() => inject('field') as NormalizedFieldStructure)

const attrs = useAttrs()

const wrapClass = computed(() => {
  const wrapName = `field-${field.value.modelKey}-container`
  const cols = field.value.wrapCols ? field.value.wrapCols : 'col-span-12'
  const _wrapClass = field.value.wrapClass ? field.value.wrapClass : 'pb-5'
  const arrayResult: string[] = [_wrapClass, wrapName, cols]

  if (attrs.class) arrayResult.push(attrs.class as string)

  return arrayResult.join(' ')
})
</script>
