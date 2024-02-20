<template>
  <form
    class="f-form"
  >
    <f-form-header v-slot="{ formModeTitle }" :title="props.settings.title" :settings="props.settings">
      <slot name="form-header" v-bind="{ formModeTitle }" />
    </f-form-header>

    <f-form-body :fields="props.fields" :settings="props.settings" :form-id="props.id">
      <template
        v-for="([slotName]) in beforeAndAfterFieldSlots"
        #[`${slotName}`]
        :key="slotName"
      >
        <slot :name="slotName" />
      </template>
    </f-form-body>

    <f-form-footer
      @main-click="onMainClick"
      @aux-click="onAuxClick"
      :buttons="props.buttons"
      :settings="props.settings"
      :is-form-valid="isFormValid"
    >
      <slot name="form-footer" v-bind="{ onMainClick, onAuxClick, isFormValid }" />
    </f-form-footer>
  </form>
</template>

<script lang="ts" setup>
import type {
  BaseObjectWithNormalizedFields, DispatchOnFailedFormEventCommand, DispatchOnSuccessFormEventCommand, NormalizedSettings,
  ObjectWithNormalizedButtons,
} from '@fancy-crud/core'
import {
  DispatchOnFailedFormEventHandler,
  DispatchOnSuccessFormEventHandler,
  IDispatchOnFailedFormEventHandler,
  IDispatchOnSuccessFormEventHandler,
  IRuleConfigStore,
  inject as injecting,
  register,
} from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'

const props = defineProps<{
  id: symbol
  fields: BaseObjectWithNormalizedFields
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
  noInsetScroll?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', response: any): void
  (e: 'error', error?: any): void
}>()

const slots = useSlots()
const ruleConfigStore: IRuleConfigStore = injecting(IRuleConfigStore.name)!

const { isFormValid } = useRules(
  props.fields, ruleConfigStore.searchById(props.id),
)

const beforeAndAfterFieldSlots = computed(() => {
  return Object.entries(slots).filter(
    ([slotName]) => slotName.startsWith('before-') || slotName.startsWith('after-') || slotName.startsWith('field-'),
  )
})

function onMainClick() {
  if (props.buttons.main.onClick)
    props.buttons.main.onClick()
}

function onAuxClick() {
  if (props.buttons.aux.onClick)
    props.buttons.aux.onClick()
}

class VueDispatchOnSuccessFormEventHandler extends DispatchOnSuccessFormEventHandler {
  execute(command: DispatchOnSuccessFormEventCommand): void {
    super.execute(command)
    emit('success', command.response?.response)
  }
}

class VueDispatchOnFailedFormEventHandler extends DispatchOnFailedFormEventHandler {
  execute(command: DispatchOnFailedFormEventCommand): void {
    super.execute(command)
    emit('error', command.response)
  }
}

register(IDispatchOnSuccessFormEventHandler.name, VueDispatchOnSuccessFormEventHandler)
register(IDispatchOnFailedFormEventHandler.name, VueDispatchOnFailedFormEventHandler)
</script>

<style lang="sass" scoped>
.f-form
  height: 100%
  display: grid
  grid-template-rows: auto 1fr auto
</style>
