<template>
  <header class="f-form-header">
    <slot v-bind="{ title }">
      <h3 class="f-form-header__title">
        {{ title }}
      </h3>
    </slot>
  </header>
</template>

<script lang="ts" setup>
import type { NormalizedSettings, NormalizedTitles } from '@fancy-crud/core'
import { Bus, GetTitleByFormModeCommand } from '@fancy-crud/core'

const props = defineProps<{
  titles: NormalizedTitles
  settings: NormalizedSettings
}>()

const bus = new Bus()

const title = computed(() => bus.execute(
  new GetTitleByFormModeCommand(props.settings.mode, props.titles),
))
</script>

<style lang="sass">
.f-form-header
  @apply pb-8

  &__title
    @apply text-2xl
</style>
