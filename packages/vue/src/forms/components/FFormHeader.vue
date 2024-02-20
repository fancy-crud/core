<template>
  <header class="f-form__header">
    <slot v-bind="{ formModeTitle }">
      <h3 class="f-form__header__title">
        {{ formModeTitle }}
      </h3>
    </slot>
  </header>
</template>

<script lang="ts" setup>
import type { NormalizedSettings } from '@fancy-crud/core'
import { Bus, GetTitleByFormModeCommand } from '@fancy-crud/core'

const props = defineProps<{
  title?: string
  settings: NormalizedSettings
}>()

const bus = new Bus()

const formModeTitle = computed(() => bus.execute(
  new GetTitleByFormModeCommand(props.settings.mode, props.title),
))
</script>
