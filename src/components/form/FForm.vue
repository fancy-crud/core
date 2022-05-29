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

    <f-form-footer
      @create="onSuccess"
      @update="onSuccess"
      @create-error="dispatchErrorNotification"
      @update-error="dispatchErrorNotification"
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
import _ from 'lodash'
import type { AxiosResponse } from 'axios'
import { FormModes } from '@/types'
import type { Form } from '@/types'
import { errorNotification, handleBadRequest, notificationStore, pushNotification, shiftNotification, successNotification } from '@/composables'

const props = defineProps<{
  form: Form
  noInsetScroll?: boolean
}>()

const emit = defineEmits<{
  (e: 'create', response: AxiosResponse): void
  (e: 'update', response: AxiosResponse): void
  (e: 'error', response?: AxiosResponse): void
}>()

const slots = useSlots()

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
    [FormModes.CREATE_MODE]: 'Se ha creado el elemento con éxito',
    [FormModes.UPDATE_MODE]: 'Se ha actualizado el elemento con éxito',
  }
  return messages[props.form.settings.mode]
})

const insetScrollStyles = computed(() => {
  return !props.noInsetScroll ? { maxHeight: '70vh', overflow: 'hidden auto' } : {}
})

const onSuccess = (response: AxiosResponse) => {
  pushNotification({
    ...successNotification(),
    message: successNotificationMessage.value,
  })

  if (props.form.settings.mode === FormModes.CREATE_MODE)
    emit('create', response)

  else
    emit('update', response)
}

const dispatchErrorNotification = (error?: AxiosResponse) => {
  if (error && error.status === 400)
    handleBadRequest(props.form, error.data)

  pushNotification({
    ...errorNotification(),
  })

  emit('error', error)
}
</script>
