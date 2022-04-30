<template>
  <teleport to="body">
    <div
      class="absolute right-5 top-5 flex flex-col"
      style="z-index: 9999"
    >
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
</script>
