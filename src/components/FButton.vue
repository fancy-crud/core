<template>
  <button
    v-bind="$attrs"
    type="button"
    :class="className"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
import { FormModes } from '@/types'

const props = defineProps<{
  mode?: FormModes
  loading?: boolean
  label?: { create?: string; update?: string}
}>()

const label = computed(() => {
  return props.mode === FormModes.CREATE_MODE ? props.label?.create : props.label?.update
})

const className = computed(() => {
  const loadingClass = props.loading ? 'loading' : ''
  return ['btn f-btn-main', loadingClass].join(' ')
})

</script>
