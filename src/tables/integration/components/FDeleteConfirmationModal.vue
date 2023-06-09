<template>
  <f-modal v-model="modelValue" :can-cancel="false">
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
          <button
            @click="accept"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            @click="cancel"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
        </div>
      </div>
    </slot>
  </f-modal>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'accept'): void
  (e: 'cancel'): void
}>()

const modelValue = ref(props.modelValue)

watch(modelValue, (value: boolean) => {
  emit('update:modelValue', value)
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
