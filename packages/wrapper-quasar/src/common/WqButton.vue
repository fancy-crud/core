<template>
  <span>
    <q-btn @click.prevent="emit('click')" v-bind="computedAttrs" :disable="props.disabled" :loading="props.isLoading">

      <slot />
    </q-btn>
  </span>
</template>

<script lang="ts" setup>
import { QBtn } from 'quasar'

const props = defineProps<{ isLoading?: boolean; disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

const attrs = useAttrs()
const computedAttrs = computed(() => {
  const { label, ...vAttrs } = attrs
  return vAttrs
})
</script>
