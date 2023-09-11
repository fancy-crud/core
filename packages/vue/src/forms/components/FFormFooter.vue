<template>
  <footer class="form-footer">
    <slot v-bind="{ mainButton, auxButton, getLabel, onMainClick, onAuxClick }">
      <f-button
        @click="onMainClick"
        v-bind="mainButton"
        :label="getLabel(mainButton)"
        :disabled="mainButton?.isDisabled || !props.isFormValid"
        type="button"
      />

      <f-button
        @click="onAuxClick"
        v-bind="auxButton"
        :label="getLabel(auxButton)"
        type="button"
      />
    </slot>
  </footer>
</template>

<script lang="ts" setup>
import type { NormalizedButton, NormalizedSettings, ObjectWithNormalizedButtons } from '@fancy-crud/core'
import { Bus, GetButtonLabelByFormModeCommand } from '@fancy-crud/core'

const props = defineProps<{
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
  isFormValid?: boolean
}>()

const emit = defineEmits<{
  (e: 'main-click'): void
  (e: 'aux-click'): void
}>()

const bus = new Bus()
const mainButton = computed(() => props.buttons.main)
const auxButton = computed(() => props.buttons.aux)

const getLabel = computed(() => (button: NormalizedButton) => bus.execute(
  new GetButtonLabelByFormModeCommand(props.settings.mode, button),
))

function onMainClick() { emit('main-click') }
function onAuxClick() { emit('aux-click') }
</script>

<style lang="sass">
.form-footer
  @apply pt-8
</style>
