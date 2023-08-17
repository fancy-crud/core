<template>
  <section class="grid grid-cols-12 gap-2 h-[100vh]">
    <aside
      class="w-full h-full bg-gray-50 dark:bg-gray-800 col-span-3"
      aria-label="Sidebar"
    >
      <div class="overflow-y-auto py-4 px-3">
        <ul class="space-y-2">
          <slot />
        </ul>
      </div>
    </aside>

    <div class="p-8 col-span-9">
      <slot :name="modelValue" />
    </div>
  </section>
</template>

<script setup lang='ts'>
import { provide, ref } from 'vue'
const sidebarItem = localStorage.getItem('sidebar-item')
const modelValue = ref(sidebarItem || '')

const updateModelValue = (value: string) => {
  modelValue.value = value
}

provide('updateModelValue', updateModelValue)
</script>
