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
  BaseObjectWithNormalizedFields, NormalizedSettings,
  ObjectWithNormalizedButtons,
} from '@fancy-crud/core'
import {
  IRuleConfigStore,
  inject as injecting,
} from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'
import type { VueForm } from '../Form'

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
const baseForm: VueForm = injecting('IBaseForm')!

baseForm.setFormId(props.id)

baseForm.setOnSuccessCallback((response) => {
  emit('success', response)
})

baseForm.setOnFailedCallback((error) => {
  emit('error', error)
})

const { isFormValid } = useRules(
  props.fields, ruleConfigStore.searchById(props.id),
)

const beforeAndAfterFieldSlots = computed(() => {
  return Object.entries(slots).filter(
    ([slotName]) => slotName.startsWith('before-') || slotName.startsWith('after-') || slotName.startsWith('field-'),
  )
})

const onMainClick = () => baseForm.onMainClick()
const onAuxClick = () => baseForm.onAuxClick()
</script>

<style lang="sass" scoped>
.f-form
  height: 100%
  display: grid
  grid-template-rows: auto 1fr auto
</style>
