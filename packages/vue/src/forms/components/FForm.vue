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
import { Bus, GenerateFormDataCommand, IFormStore, IResponseInterceptorStore, IRuleOptionsStore, SaveRecordCommand } from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'

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
const bus = new Bus()

const formStore: IFormStore = inject(IFormStore.name)!
const ruleOptionsStore: IRuleOptionsStore = inject(IRuleOptionsStore.name)!
const responseInterceptorStore: IResponseInterceptorStore = inject(IResponseInterceptorStore.name)!

const { isFormValid } = useRules(props.fields, ruleOptionsStore.searchById(props.id))

const beforeAndAfterFieldSlots = computed(() => {
  return Object.entries(slots).filter(
    ([slotName]) => slotName.startsWith('before-') || slotName.startsWith('after-'),
  )
})

function onSuccess(response?: StandardResponseStructure) {
  emit('success', response)

  if (props.settings.disableResponseHandlers || !response)
    return

  responseInterceptorStore.intercept(props.id, response.status, response)
}

function onFailed(error?: StandardErrorResponseStructure) {
  emit('error', error)

  if (props.settings.disableResponseHandlers || !error)
    return

  responseInterceptorStore.intercept(props.id, error.response.status, error)
}

function onMainClick() {
  const { buttons } = formStore.searchById(props.id) || {}

  if (typeof props.buttons.main.onClick === 'function') {
    props.buttons.main.onClick()
    return
  }

  const { jsonForm, formData } = bus.execute(
    new GenerateFormDataCommand(props.fields),
  )

  const { url, mode, lookupValue } = props.settings
  const data = jsonForm || formData

  bus.execute(
    new SaveRecordCommand(url, data, mode, lookupValue, {
      onInit() {
        if (buttons)
          buttons.main.isLoading = true
      },
      onSuccess,
      onFailed,
      onFinally() {
        if (buttons)
          buttons.main.isLoading = false
      },
    }),
  )
}

function onAuxClick() {
  if (typeof props.buttons.aux.onClick === 'function')
    props.buttons.aux.onClick()
}
</script>
