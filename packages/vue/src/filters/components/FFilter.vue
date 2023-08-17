<template>
  <main
    class="grid grid-cols-12 gap-x-8"
    v-bind="$attrs"
  >
    <template
      v-for="([fieldKey, field]) in filters"
      :key="fieldKey"
    >
      <slot :name="`before-${fieldKey}`" />
      <component
        :is="getComponent(field)"
        v-bind="{ field }"
      />
      <slot :name="`after-${fieldKey}`" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import type { NormalizedField, NormalizedFields } from '@fancy-crud/core'

import { fields } from '@fancy-crud/core'

const props = defineProps<{
  filters: NormalizedFields<Record<string, unknown>>
}>()

const getComponent = (field: NormalizedField) => {
  type ControlType = keyof typeof fields
  return fields[field.type as ControlType] || fields.text
}

const filters = computed(() => {
  const _filters = Object.entries(props.filters).filter(([_, filter]) => {
    if (filter.hidden)
      return false

    return true
  })

  return _filters
})

onMounted(() => {
  // TODO: Fetch Foreign keys values
})
</script>
