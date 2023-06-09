<template>
  <a
    @mouseenter="openPreview"
    @mouseleave="closePreview"
    ref="triggerEl"
    :href="url || undefined"
    tabindex="0"
    target="_blank"
    class="text-primary-600 hover:bg-gray-100 focus:outline-none font-medium rounded-full text-2xl py-2 px-3 text-center inline-flex items-center dark:hover:bg-gray-700"
    role="button"
  >
    <i
      class="mdi"
      :class="iconClass"
    />
  </a>
  <teleport to="body">
    <figure
      v-if="isImageType"
      ref="targetEl"
      class="bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 z-10 flex justify-end"
      :class="{ hidden: !display }"
    >
      <img
        :src="url || undefined"
        alt="Image preview"
        style="max-width: 256px; max-height: 256px;"
      >
    </figure>
  </teleport>
</template>

<script lang="ts" setup>
import { createPopper } from '@popperjs/core'

const props = defineProps<{
  type: string
  url: string | null
}>()

// set the dropdown menu element
const targetEl = ref()
const triggerEl = ref()
const display = ref(false)

const isImageType = computed(() => props.type === 'image')

const iconClass = computed(() => {
  return props.type === 'image' ? 'image' : 'file'
})

const openPreview = () => {
  display.value = true
}

const closePreview = () => {
  display.value = false
}

onMounted(() => {
  createPopper(triggerEl.value, targetEl.value, {
    placement: 'left',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  })
})
</script>
