<template>
  <component :is="components.tableBody" v-bind="$attrs" :headers="props.headers" :items="props.items">
    <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
      <slot :name="slotName" v-bind="bind" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import type { NormalizedColumn } from '@fancy-crud/core'
import { components } from '@fancy-crud/core'

const props = defineProps<{
  headers: NormalizedColumn[]
  items: any[]
}>()

const slots = useSlots()
</script>
