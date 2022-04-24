<template>
  <div :class="wrapClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'

const props = defineProps<{ field: NormalizedFieldStructure; fieldKey: string }>()

const attrs = useAttrs()

const wrapClass = computed(() => {
  const wrapName = `field-${props.fieldKey}-container`
  const cols = props.field.wrapCols ? props.field.wrapCols : 'col-span-12'
  const _wrapClass = props.field.wrapClass ? props.field.wrapClass : 'pb-5'
  const arrayResult: string[] = [_wrapClass, wrapName, cols]

  if (attrs.class) arrayResult.push(attrs.class as string)

  return arrayResult.join(' ')
})
</script>
