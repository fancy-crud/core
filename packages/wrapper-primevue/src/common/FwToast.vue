<template>
  <Toast 
    :position="position" 
    :group="group"
    :breakpoints="breakpoints"
    :pt="pt"
    :ptOptions="ptOptions"
  >
    <!-- Pass through slots for custom templates -->
    <template v-if="$slots.message" #message="slotProps">
      <slot name="message" v-bind="slotProps" />
    </template>
    <template v-if="$slots.container" #container="slotProps">
      <slot name="container" v-bind="slotProps" />
    </template>
    <template v-if="$slots.icon" #icon="slotProps">
      <slot name="icon" v-bind="slotProps" />
    </template>
    <template v-if="$slots.closeicon" #closeicon="slotProps">
      <slot name="closeicon" v-bind="slotProps" />
    </template>
  </Toast>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'
import { setToastInstance } from './notify'

export interface FwToastProps {
  /** Position of the toast on screen */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'
  /** Unique key to target specific Toast components */
  group?: string
  /** Object literal to define widths per screen size */
  breakpoints?: Record<string, { width: string; [key: string]: any }>
  /** Used to pass attributes to DOM elements inside the component (PassThrough) */
  pt?: any
  /** PassThrough options */
  ptOptions?: any
}

withDefaults(defineProps<FwToastProps>(), {
  position: 'top-right',
})

const toastService = useToast()

onMounted(() => {
  // Register the toast instance in the singleton
  setToastInstance(toastService)
})
</script>
