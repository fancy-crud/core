<template>
  <label
    class="label f-label font-bold pl-0"
    v-bind="$attrs"
  >
    <slot>
      <span class="label-text f-label-text">{{ props.label }}</span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string
}>()
</script>
