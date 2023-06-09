<template>
  <form
    class="f-form"
  >
    <f-form-header v-slot="{ title }" :titles="props.titles" :settings="props.settings">
      <slot name="form-header" v-bind="{ title }" />
    </f-form-header>

    <!-- <f-form-body :fields="props.fields" :settings="props.settings" :style="insetScrollStyles"> -->
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
import type { NormalizedSettings, NormalizedTitles, ObjectWithNormalizedButtons, ObjectWithNormalizedFields } from '@fancy-crud/core'
import { CreateOrUpdateRecord, FormManagerHandler } from '@fancy-crud/core'

interface StandardResponseStructure { data: any; status: number }
interface StandardErrorResponseStructure { response: StandardResponseStructure }

const props = defineProps<{
  id: symbol
  fields: ObjectWithNormalizedFields
  titles: NormalizedTitles
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
  noInsetScroll?: boolean
  disableNotifications?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', response: unknown): void
  (e: 'error', error?: any): void
}>()

const slots = useSlots()

const formManager = new FormManagerHandler(props.id)
const createOrUpdate = new CreateOrUpdateRecord(props.id)

const { isFormValid } = useRules(props.fields, formManager.ruleOptions)

const beforeAndAfterFieldSlots = computed(() => {
  return Object.entries(slots).filter(
    ([slotName]) => slotName.startsWith('before-') || slotName.startsWith('after-'),
  )
})

function onSuccess(response?: StandardResponseStructure) {
  emit('success', response)

  if (props.settings.disableResponseHandlers || !response)
    return

  const handler = formManager.responseManager.getResponseHandler(response.status)

  if (handler)
    handler(response.data)
}

function onFailed(error?: StandardErrorResponseStructure) {
  emit('error', error)

  if (props.settings.disableResponseHandlers || !error)
    return

  const handler = formManager.responseManager.getResponseHandler(error.response.status)

  if (handler)
    handler(error.response.data)
}

function onMainClick() {
  const { buttons } = formManager.getForm()

  createOrUpdate.execute({
    onInit() {
      buttons.main.isLoading = true
    },
    onSuccess,
    onFailed,
    onFinally() {
      buttons.main.isLoading = false
    },
  })
}

function onAuxClick() {
  if (typeof props.buttons.aux.onClick === 'function')
    props.buttons.aux.onClick()
}
</script>
