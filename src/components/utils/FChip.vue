<template>
  <div
    class="flex justify-center items-center m-1 px-2 py-1 rounded-full text-base text-white font-medium"
    :class="bgColor"
  >
    <slot name="prepend" />
    <div class="flex-initial max-w-full leading-none text-xs font-normal">
      <slot />
    </div>
    <slot name="append" />
  </div>
</template>

<script setup lang='ts'>
import { useAttrs } from 'vue'
import { useDefaultBackgroundColor } from '@/composables'
const attrs = useAttrs() as any

const bgColor = useDefaultBackgroundColor(
  'bg-gray-300',
  typeof attrs === 'object' && attrs.class ? attrs.class : '',
)
</script>
