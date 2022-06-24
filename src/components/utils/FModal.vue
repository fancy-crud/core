<template>
  <slot
    name="activator"
    v-bind="{ open, close }"
  />
  <teleport to="body">
    <div
      ref="modalRef"
      tabindex="-1"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts" setup>import { onMounted, provide, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean
  placement?: string
  persistent?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

provide('persistent', () => props.persistent)

const modal = ref()
const modalRef = ref()
const display = ref(props.modelValue)

const open = () => modal.value.show()
const close = () => modal.value.hide()

watch(display, () => {
  emit('update:modelValue', display.value)
})

watch(() => props.modelValue, () => {
  if (display.value !== props.modelValue) {
    display.value = props.modelValue
    display.value ? open() : close()
  }
})

onMounted(() => {
  modal.value = new Modal(modalRef.value, {
    placement: props.placement ?? 'center',
    onShow() {
      display.value = true
    },
    onHide() {
      display.value = false
    },
  })

  if (display.value) open()
})
</script>
