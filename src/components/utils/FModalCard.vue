<template>
  <label
    class="modal-box pt-1"
    for=""
  >
    <slot />
  </label>
</template>

<script lang="ts" setup>
const v = inject('persistent')
const hasPersistent = computed(() => v())

</script>
