import _ from "lodash"
import { ref, computed } from 'vue'
import { Notification } from "@/types"

export const successNotification = (props?: Partial<Notification>) => ({
  backgroundColor: 'bg-green-400',
  textColor: 'text-white',
  icon: 'mdi mdi-check-circle',
  message: 'Se ha creado el elemento con éxito',
  duration: 4000,
  ...props
})

export const warningNotification = (props?: Partial<Notification>) => ({
  backgroundColor: 'bg-amber-500',
  textColor: 'text-white',
  icon: 'mdi mdi-close-circle',
  message: 'Algo intenta fallar',
  duration: 4000,
  ...props
})

export const errorNotification = (props?: Partial<Notification>) => ({
  backgroundColor: 'bg-red-500',
  textColor: 'text-white',
  icon: 'mdi mdi-close-circle',
  message: 'Ha ocurrido un error',
  duration: 4000,
  ...props
})

const _notificationStore = ref<Notification[]>([])

export function pushNotification(notification: Notification) {
  _notificationStore.value.push(notification)
}

export function shiftNotification() {
  _notificationStore.value.shift()
}

export const notificationStore = computed(() => {
  return _notificationStore.value
})