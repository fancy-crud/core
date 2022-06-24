<template>
  <button
    ref="buttonRef"
    type="button"
    class="hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:focus:ring-primary-800"
    :class="[bgColor, textColor]"
    v-bind="$attrs"
  >
    <i
      class="mdi text-slate-400 w-5 h-5 flex items-center justify-center"
      :class="[icon, iconSize]"
    />
  </button>

  <teleport to="body">
    <div
      ref="tooltipRef"
      role="tooltip"
      class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
    >
      {{ tooltip }}
      <div
        class="tooltip-arrow"
        data-popper-arrow
      />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
const props = defineProps<{
  icon: string
  size?: string
  tooltip?: string
  tooltipPlacement?: string
  bgColor?: string
  textColor?: string
}>()

const buttonRef = ref()
const tooltipRef = ref()
const tooltipPopper = ref()

const iconSize = computed(() => {
  return props.size ?? 'text-2xl'
})

const bgColor = computed(() => props.bgColor ?? '')
const textColor = computed(() => props.textColor ?? 'text-primary-700')

onMounted(() => {
  if (props.tooltip) {
    tooltipPopper.value = new Tooltip(tooltipRef.value, buttonRef.value, {
      triggerType: 'hover',
      placement: props.tooltipPlacement ?? 'bottom',
    })
  }
})
</script>
