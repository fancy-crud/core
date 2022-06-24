<template>
  <header class="f-form-header p-3">
    <slot v-bind="{ title }">
      <h3 class="text-2xl">
        {{ title }}
      </h3>
    </slot>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Form } from '@/types'
import { FormModes } from '@/types'

const props = defineProps<{
  form: Form
}>()
const title = computed(() => {
  if (typeof props.form.settings.title === 'string')
    return props.form.settings.title

  return props.form.settings.mode === FormModes.CREATE_MODE
    ? props.form.settings.title.create
    : props.form.settings.title.update
})
</script>
