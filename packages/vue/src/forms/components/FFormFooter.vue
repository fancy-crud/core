<template>
  <footer class="f-form__footer">
    <slot v-bind="{ mainButton, auxButton, getLabel, onMainClick, onAuxClick, isMainButtonDisabled }">
      <f-button
        v-if="!mainButton.hidden"
        @click="onMainClick"
        v-bind="mainButton"
        :disabled="isMainButtonDisabled"
        class="f-button f-form__footer__button f-form__footer__button--main"
      >
        {{ getLabel(mainButton) }}
      </f-button>

      <f-button
        v-if="!auxButton.hidden"
        @click="onAuxClick"
        v-bind="auxButton"
        class="f-button f-form__footer__button f-form__footer__button--aux"
      >
        {{ getLabel(auxButton) }}
      </f-button>
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

const mainButton = computed(() => {
  const { onClick, ...attrs } = props.buttons.main
  return attrs
})

const auxButton = computed(() => {
  const { onClick, ...attrs } = props.buttons.aux
  return attrs
})

const getLabel = computed(() => (button: NormalizedButton) => bus.execute(
  new GetButtonLabelByFormModeCommand(props.settings.mode, button.label),
))

const isMainButtonDisabled = computed(() => mainButton.value?.isDisabled || !props.isFormValid)

function onMainClick() {
  if (!isMainButtonDisabled.value)
    emit('main-click')
}
function onAuxClick() { emit('aux-click') }
</script>
