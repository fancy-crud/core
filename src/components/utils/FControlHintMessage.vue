<template>
  <p
    v-for="(message, key) in messages"
    :key="key"
    :class="textColorClass"
    class="mt-2 text-sm font-medium"
  >
    {{ message }}
  </p>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { NormalizedFieldStructure } from '@/types'

const field = computed(() => inject('field') as NormalizedFieldStructure)

const messages = computed(() => {
  let result: string[] = field.value.hintText ? [field.value.hintText] : []

  if (field.value.errors.length)
    result = field.value.errors

  return result
})

const hasErrors = computed(() => {
  return !!field.value.errors.length
})

const textColorClass = computed(() => {
  return hasErrors.value ? 'text-red-500' : 'text-gray-500'
})
</script>
