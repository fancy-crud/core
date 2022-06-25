<template>
  <form
    class="f-form"
  >
    <f-form-header :form="form">
      <template
        #default="{ title }"
      >
        <slot
          name="form-header"
          v-bind="{ title }"
        />
      </template>
    </f-form-header>

    <f-form-main
      :form="form"
      :style="insetScrollStyles"
    >
      <template
        v-for="([slotName]) in beforeAndAfterFieldSlots"
        #[`${slotName}`]
        :key="slotName"
      >
        <slot :name="slotName" />
      </template>
    </f-form-main>

    <ul class="pl-4 pb-4">
      <li
        v-for="(error, i) in generarErrors"
        :key="i"
        class="text-red-500 font-medium"
      >
        {{ error }}
      </li>
    </ul>

    <f-form-footer
      @create="onSuccess"
      @update="onSuccess"
      @error="dispatchErrorNotification"
      :form="form"
    />

    <f-notification-group>
      <f-notification
        v-for="(notification, i) in notifications"
        @dismiss="shiftNotification"
        v-bind="notification"
        :key="i"
        class="mb-4"
      />
    </f-notification-group>
  </form>
</template>

<script lang="ts" setup>
import { computed, useSlots, watch } from 'vue'
import _ from 'lodash'
import type { AxiosResponse } from 'axios'
// import { FFormMain, FNotificationGroup } from '@/components'
import { FormModes } from '@/types'
import type { Form } from '@/types'
import { errorNotification, handleBadRequest, notificationStore, pushNotification, shiftNotification, successNotification, useLocale } from '@/composables'

const props = defineProps<{
  form: Form
  noInsetScroll?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', formMode: FormModes, response: AxiosResponse): void
  (e: 'error', formMode: FormModes, response?: AxiosResponse): void
}>()

const slots = useSlots()
const t = useLocale()
// const formClone = _.cloneDeep(props.form)

const notifications = computed(() => notificationStore.value)

watch(notifications, () => {
  console.log(notifications.value.length)
})

const beforeAndAfterFieldSlots = computed(() => {
  return Object.entries(slots).filter(
    ([slotName]) => slotName.startsWith('before-') || slotName.startsWith('after-'),
  )
})

const successNotificationMessage = computed(() => {
  const messages = {
    [FormModes.CREATE_MODE]: t.value('element-created'),
    [FormModes.UPDATE_MODE]: t.value('element-updated'),
  }
  return messages[props.form.settings.mode]
})

const insetScrollStyles = computed(() => {
  return !props.noInsetScroll ? { maxHeight: '70vh', overflow: 'hidden auto' } : {}
})

const generarErrors = computed(() => {
  return props.form.generalErrors || []
})

const onSuccess = (response: AxiosResponse) => {
  pushNotification({
    ...successNotification(),
    message: successNotificationMessage.value,
  })

  emit('success', props.form.settings.mode, response)
}

const dispatchErrorNotification = (error?: AxiosResponse) => {
  if (error && error.status === 400)
    handleBadRequest(props.form, error.data)

  pushNotification({
    ...errorNotification(),
  })

  emit('error', props.form.settings.mode, error)
}
</script>
