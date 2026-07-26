<template>
  <header 
    class="f-form__header"
    :class="{ 'f-form__header--shadow': isScrolledFromTop }"
  >
    <slot v-bind="{ formModeTitle, title, mode }">
      <h3 class="f-form__header__title">
        {{ formModeTitle }}
      </h3>
      <f-button
        v-if="showCloseButton"
        @click="emit('close')"
        class="f-form__header__close-button"
        v-bind="defaults.closeModalButton"
      />
    </slot>
  </header>
</template>

<script lang="ts" setup>
import { computed, Ref, inject } from 'vue'
import type { FormMode } from '@fancy-crud/core'
import { Bus, getDefaults, GetTitleByFormModeCommand } from '@fancy-crud/core'

const props = defineProps<{
  title?: string
  mode: FormMode
  showCloseButton?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const bus = new Bus()

const defaults = getDefaults()

// Inject scroll state from FFormBody
const formScrollState = inject<{
  isScrolledFromTop: Ref<boolean>
  isScrolledFromBottom: Ref<boolean>
}>('formScrollState', {
  isScrolledFromTop: ref(false),
  isScrolledFromBottom: ref(false),
})

const isScrolledFromTop = formScrollState.isScrolledFromTop

const formModeTitle = computed(() => bus.execute(
  new GetTitleByFormModeCommand(props.mode, props.title),
))
</script>
