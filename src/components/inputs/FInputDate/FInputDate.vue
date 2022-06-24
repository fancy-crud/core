<template>
  <f-control-wrap>
    <f-control-label :class="[errorStyles.textColor]">
      {{ field.label }}
    </f-control-label>

    <div class="relative">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        @blur="setModel"
        v-bind="props.field"
        ref="inputRef"
        :class="[errorStyles.borderColor]"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
      >
    </div>

    <f-control-hint-message />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, provide, ref } from 'vue'
import Datepicker from 'flowbite-datepicker/Datepicker'
import type { NormalizedFieldStructure } from '@/types'
import { setInputTextModelValue, useErrorStyles, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

provide('field', props.field)

const inputRef = ref<HTMLInputElement>()
const dateInput = ref<any>()

const errorStyles = useErrorStyles(props.field)
const modelValue = useSetModelValue(props.field, () => {
  setInputTextModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})

const setModel = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  modelValue.value = value
}

onMounted(() => {
  if (inputRef.value) {
    dateInput.value = new Datepicker(inputRef.value, {
      todayHighlight: true,
      todayBtn: true,
      clearBtn: true,
    })
  }
})

onUnmounted(() => dateInput.value.hide())
</script>
