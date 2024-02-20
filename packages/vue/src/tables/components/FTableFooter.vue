<template>
  <component :is="components.tableFooter" v-bind="$attrs" :pagination="props.pagination">
    <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
      <slot :name="slotName" v-bind="bind" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { components } from '@fancy-crud/core'
import type { TableFooterProps } from '../typing'

const props = defineProps<TableFooterProps>()
const slots = useSlots()
</script>
