<template>
  <li
    v-if="title"
    class="text-lg font-medium text-gray-400"
  >
    <slot>
      {{ title }}
    </slot>
  </li>
  <li
    v-else
    @click="triggerUpdateModelValue"
  >
    <a
      href="#"
      class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span class="ml-3">
        <slot>{{ props.label }}</slot>
      </span>
    </a>
  </li>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const props = defineProps<{
  id?: string
  label?: string
  title?: string
}>()

const updateModelValue = inject('updateModelValue') as (value: string) => void
const triggerUpdateModelValue = () => {
  localStorage.setItem('sidebar-item', props.id ?? '')
  updateModelValue(props.id ?? '')
}
</script>
