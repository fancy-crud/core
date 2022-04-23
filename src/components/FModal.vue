<template>
  <div>
    <input
      :id="id"
      v-model="display"
      type="checkbox"
      class="modal-toggle"
    >
    <label
      :id="id"
      :for="!persistent ? id : ''"
      class="modal"
    >
      <slot />
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
  modelValue: boolean
  persistent?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

provide('persistent', () => props.persistent)

const display = ref(props.modelValue)

watch(display, () => emit('update:modelValue', display.value))
watch(() => props.modelValue, () => display.value = props.modelValue)
</script>
