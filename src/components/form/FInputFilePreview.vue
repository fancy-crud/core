<template>
  <div class="dropdown dropdown-hover dropdown-left dropdown-end absolute right-0 top-1/2 -translate-y-1/2 z-10">
    <a
      :href="url"
      tabindex="0"
      target="_blank"
      class="btn"
      role="button"
    >
      <i
        class="mdi"
        :class="iconClass"
      />
    </a>
    <figure
      v-if="isImageType"
      tabindex="0"
      class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
    >
      <img
        :src="url"
        alt="Image preview"
        style="max-width: 500px"
      >
    </figure>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: string
  url: string
}>()

const isImageType = computed(() => props.type === 'image')

const iconClass = computed(() => {
  return props.type === 'image' ? 'mdi-image' : 'mdi-file'
})
</script>
