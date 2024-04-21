<template>
  <f-modal v-model="modelValue">
    <slot v-bind="{ accept, cancel }">
      <div max-width="bg-white max-w-md">
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this record?
          </h3>
          <f-button
            @click="accept"
            class="f-button f-modal__button--accept"
            v-bind="defaults.confirmButton"
          >
            Yes, I'm sure
          </f-button>
          <f-button
            @click="cancel"
            class="f-button f-modal__button--cancel ml-4"
            v-bind="defaults.cancelButton"
          >
            No, cancel
          </f-button>
        </div>
      </div>
    </slot>
  </f-modal>
</template>

<script lang="ts" setup>
import { getDefaults } from '@fancy-crud/core'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'accept'): void
  (e: 'cancel'): void
}>()

const modelValue = ref(props.modelValue)

const defaults = computed(getDefaults)

watch(modelValue, (value: boolean) => {
  emit('update:modelValue', value)
  if (!value)
    emit('cancel')
})

watch(() => props.modelValue, () => {
  modelValue.value = props.modelValue
})

function closeModal() {
  modelValue.value = false
}

function accept() {
  closeModal()
  emit('accept')
}

function cancel() {
  closeModal()
  emit('cancel')
}
</script>
