<template>
  <header class="f-form__header">
    <slot v-bind="{ formModeTitle, title, mode }">
      <h3 class="f-form__header__title">
        {{ formModeTitle }}
      </h3>
    </slot>
  </header>
</template>

<script lang="ts" setup>
import type { FormMode } from '@fancy-crud/core'
import { Bus, GetTitleByFormModeCommand } from '@fancy-crud/core'

const props = defineProps<{
  title?: string
  mode: FormMode
}>()

const bus = new Bus()

const formModeTitle = computed(() => bus.execute(
  new GetTitleByFormModeCommand(props.mode, props.title),
))
</script>
