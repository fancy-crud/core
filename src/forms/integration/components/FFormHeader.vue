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
import { FormModes } from '@fancy-crud/core'

const props = defineProps<{
  titles: NormalizedTitles
  settings: NormalizedSettings
}>()

const title = computed(() => {
  return props.settings.mode === FormModes.CREATE_MODE
    ? props.titles.create
    : props.titles.update
})
</script>

<style lang="sass">
.f-form-header
  @apply pb-8

  &__title
    @apply text-2xl
</style>
