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

    <f-notification
      v-model="notification.display"
      v-bind="notification.props"
    />
  </form>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { AxiosResponse } from 'axios'
import type { Form } from '@/types'
import { errorNotification, successNotification } from '@/composables'

const props = defineProps<{
  form: Form
  noInsetScroll?: boolean
}>()

const emit = defineEmits<{
  (e: 'create', response: AxiosResponse): void
  (e: 'update', response: AxiosResponse): void
  (e: 'create-error', response: AxiosResponse): void
  (e: 'update-error', response: AxiosResponse): void
}>()

const slots = useSlots()

const formClone = _.cloneDeep(props.form)

const notification = reactive<{ display: boolean; props: Notification }>({
  display: false,
  props: {
    message: '',
  },
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
  return !props.noInsetScroll ? { maxHeight: '70vh', overflowY: 'auto' } : {}
})

const onSuccess = (response: AxiosResponse) => {
  const emitEventName = {
    [FormModes.CREATE_MODE]: 'create',
    [FormModes.UPDATE_MODE]: 'update',
  }
  Object.assign(notification, {
    display: true,
    props: {
      ...successNotification(),
      message: successNotificationMessage(),
    },
  })

  emit(emitEventName, response)
}

const dispatchErrorNotification = () => {
  Object.assign(notification, {
    props: {
      ...errorNotification(),
    },
    display: true,
  })
}

</script>
