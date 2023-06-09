<template>
  <component :is="table.body" v-bind="$attrs" :headers="props.headers" :items="props.items" />
</template>

<script lang="ts" setup>
import type { NormalizedColumn } from '@fancy-crud/core'
import { table } from '@fancy-crud/core'

const props = defineProps<{
  headers: NormalizedColumn[]
  items: any[]
}>()
</script>
