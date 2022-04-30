<template>
  <div
    :class="[props.maxWidth]"
    class="relative w-full h-full md:h-auto animate__animated animate__slideInDown"
  >
    <div
      v-bind="$attrs"
      class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  maxWidth?: string
}>()
</script>
