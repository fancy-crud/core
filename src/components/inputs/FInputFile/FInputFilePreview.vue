<template>
  <div class="absolute right-0 top-1/2 -translate-y-1/2 z-10">
    <a
      @mouseenter="openPreview"
      @mouseleave="closePreview"
      ref="triggerEl"
      :href="url"
      tabindex="0"
      target="_blank"
      class="text-white bg-primary-500 hover:bg-primary-800 focus:outline-none focus:ring-primary-300 font-medium rounded-r-lg text-lg py-2 px-3 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
        class="bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 w-56"
        :class="{'hidden': !display }"
      >
        <img
          :src="url"
          alt="Image preview"
        >
      </figure>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { createPopper } from '@popperjs/core'

const props = defineProps<{
  type: string
  url: string
}>()

// set the dropdown menu element
const targetEl = ref()
const triggerEl = ref()
const display = ref(false)

const isImageType = computed(() => props.type === 'image')

const iconClass = computed(() => {
  return props.type === 'image' ? 'mdi-image' : 'mdi-file'
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
