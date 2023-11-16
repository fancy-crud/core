<template>
  <component
    :is="components.tableBody"
    v-bind="$attrs"
    :headers="props.headers"
    :items="props.items"
    :pagination="props.pagination"
    :buttons="props.buttons"
  >
    <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
      <slot :name="slotName" v-bind="bind" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import type { NormalizedColumn, NormalizedTableButtons, NormalizedTablePagination } from '@fancy-crud/core'
import { components } from '@fancy-crud/core'

const props = defineProps<{
  headers: NormalizedColumn[]
  items: any[]
  pagination: NormalizedTablePagination
  buttons: NormalizedTableButtons
}>()

const slots = useSlots()
</script>
