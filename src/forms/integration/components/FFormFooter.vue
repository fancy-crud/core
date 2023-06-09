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
import { FormModes } from '@fancy-crud/core'

const props = defineProps<{
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
  isFormValid?: boolean
}>()

const emit = defineEmits<{
  (e: 'main-click'): void
  (e: 'aux-click'): void
}>()

const mainButton = computed(() => props.buttons.main)
const auxButton = computed(() => props.buttons.aux)

const getLabel = computed(() => (button: NormalizedButton) => {
  return props.settings.mode === FormModes.CREATE_MODE ? button.label.create : button.label.update
})

function onMainClick() { emit('main-click') }
function onAuxClick() { emit('aux-click') }
</script>

<style lang="sass">
.form-footer
  @apply py-8
</style>
