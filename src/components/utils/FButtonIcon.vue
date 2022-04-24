<template>
  <button
    type="button"
    class="text-primary-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:focus:ring-primary-800"
    v-bind="$attrs"
  >
    <i
      class="mdi text-slate-400 w-5 h-5 flex items-center justify-center"
      :class="[icon, iconSize]"
    />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string
  size?: string
}>()

const iconSize = computed(() => {
  return props.size ?? 'text-2xl'
})
</script>
