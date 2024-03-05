<template>
  <div>
    <h1>The Magic</h1>
  </div>
</template>

<script lang="ts" setup>
const tableId: symbol = inject('tableId')

console.log('🚀 ~ tableId:', tableId)
</script>
