<template>
  <thead class="w-full">
    <tr>
      <template
        v-for="(header, i) in headers"
        :key="`header-${i}`"
      >
        <th class="text-slate-400 bg-base-100 normal-case">
          {{ header.label }}
        </th>
      </template>
    </tr>
    <tr
      v-if="loading"
      class="relative w-full left-0 top-0 h-1 rounded preloader"
    />
  </thead>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@/types'

const props = defineProps<{
  headers: TableHeader[]
  loading?: boolean
}>()
</script>
