<template>
  <button
    v-bind="$attrs"
    ref="buttonRef"
    :disabled="props.loading"
    :class="className"
    class="f-button f-button--hover"
    type="button"
  >
    <svg
      v-if="props.loading"
      role="status"
      class="inline w-4 h-4 mr-3 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
    <template v-if="props.icon">
      <i
        :class="props.icon"
        class="w-5 h-5 flex items-center justify-center"
      />
    </template>
    <slot v-else>
      {{ props.label }}
    </slot>
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
import { computed, onMounted, ref, useAttrs } from 'vue'
import { useDefaultBackgroundColor } from '@/composables'

const props = defineProps<{
  loading?: boolean
  label?: string
  icon?: string
  tooltip?: string
  tooltipPlacement?: string
}>()
const attrs = useAttrs() as any

const buttonRef = ref()
const tooltipRef = ref()
const tooltipPopper = ref()

const bgColor = useDefaultBackgroundColor(
  'bg-gray-300',
  typeof attrs === 'object' && attrs.class ? attrs.class : '',
)

const className = computed(() => {
  const isIcon = props.icon ? 'f-button--icon' : ''
  return [
    bgColor.value,
    isIcon,
  ]
})

onMounted(() => {
  if (props.tooltip) {
    tooltipPopper.value = new Tooltip(tooltipRef.value, buttonRef.value, {
      triggerType: 'hover',
      placement: props.tooltipPlacement ?? 'bottom',
    })
  }
})
</script>

<style lang="sass">
.f-button
  @apply font-medium px-5 py-3 focus:outline-none
  @apply focus:ring-0 transition-all duration-500

.f-button--icon
  @apply p-2.5
</style>
