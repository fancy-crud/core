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
import type { BaseObjectWithNormalizedFields, FormMode, NormalizedField, NormalizedSettings, NotificationType, ObjectWithNormalizedButtons } from '@fancy-crud/core'
import {
  Bus,
  FORM_MODE,
  FilterFieldsByFormModeCommand,
  GenerateFormDataCommand,
  IFormStore,
  INotificationStore,
  IResponseInterceptorStore,
  IRuleConfigStore,
  NOTIFICATION_TYPE,
  SaveRecordCommand,
  getDefaultNotifications,
  inject as injecting,
} from '@fancy-crud/core'
import { useRules } from '@packages/vue/forms'

interface StandardResponseStructure { data: any; status: number }
interface StandardErrorResponseStructure { response: StandardResponseStructure }

const props = defineProps<{
  id: symbol
  fields: BaseObjectWithNormalizedFields
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
  noInsetScroll?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', response: unknown): void
  (e: 'error', error?: any): void
}>()

const slots = useSlots()
const bus = new Bus()

const formStore: IFormStore = injecting(IFormStore.name)!
const ruleConfigStore: IRuleConfigStore = injecting(IRuleConfigStore.name)!
const responseInterceptorStore: IResponseInterceptorStore = injecting(IResponseInterceptorStore.name)!
const notificationService: INotificationStore = injecting(INotificationStore.name)!

const { isFormValid } = useRules(props.fields, ruleConfigStore.searchById(props.id))

const beforeAndAfterFieldSlots = computed(() => {
  return Object.entries(slots).filter(
    ([slotName]) => slotName.startsWith('before-') || slotName.startsWith('after-') || slotName.startsWith('field-'),
  )
})

function onSuccess(response?: StandardResponseStructure) {
  emit('success', response)
  triggerResponseInterceptor({ response })
  triggerNotification(NOTIFICATION_TYPE.success)
}

function onFailed(error?: StandardErrorResponseStructure) {
  emit('error', error)
  triggerResponseInterceptor(error, true)
  triggerNotification(NOTIFICATION_TYPE.error)
}

function filterFields(fields: BaseObjectWithNormalizedFields, mode: FormMode): [string, NormalizedField][] {
  const filteredFields = bus.execute(
    new FilterFieldsByFormModeCommand(fields, mode),
  ) as [string, NormalizedField][]

  return filteredFields
}

function onMainClick() {
  const { buttons } = formStore.searchById(props.id) || {}

  if (typeof props.buttons.main.onClick === 'function') {
    props.buttons.main.onClick()
    return
  }

  const fields = filterFields(props.fields, props.settings.mode).reduce((previous, [fieldKey, field]) => {
    if (field.exclude !== true)
      return previous[fieldKey] = field
    return previous
  }, {} as Record<string, NormalizedField>)

  const { jsonForm, formData } = bus.execute(
    new GenerateFormDataCommand(fields),
  )

  const { url, mode, lookupValue } = props.settings
  const data = formData || jsonForm

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

function triggerResponseInterceptor(response?: Partial<StandardErrorResponseStructure>, isError?: boolean) {
  if (props.settings.disableResponseHandlers || !response)
    return

  const interceptorId = props.id
  const formId = props.id

  const responseOrError = isError ? response : response.response
  const statusCode = response.response?.status || 0
  responseInterceptorStore.intercept(interceptorId, formId, statusCode, responseOrError)
}

function triggerNotification(notificationType: NotificationType) {
  if (props.settings.disableNotifications)
    return

  const notifications = getDefaultNotifications()

  const notificationAction = props.settings.mode === FORM_MODE.create ? notifications.onCreateRecord : notifications.onUpdateRecord
  const notification = notificationAction[notificationType]

  if (!notification)
    return

  notificationService.pushNotification(props.id, notification)
}
</script>

<style lang="sass" scoped>
.f-form
  height: 100%
  display: grid
  grid-template-rows: auto 1fr auto
</style>
