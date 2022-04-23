<template>
  <label
    v-for="(message, key) in messages"
    :key="key"
    :class="textColorClass"
    class="label f-label-hint"
  >
    <p
      class="label-text-alt label-text font-semibold f-label-hint-message pt-0"
    >
      {{ message }}
    </p>
  </label>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const messages = computed(() => {
  let result: string[] = props.field.hintText ? [props.field.hintText] : []

  if (props.field.errors.length)
    result = props.field.errors

  return result
})

const hasErrors = computed(() => {
  return !!props.field.errors.length
})

const textColorClass = computed(() => {
  return hasErrors.value ? 'text-red-600' : 'text-gray-400'
})

</script>
