<template>
  <section class="grid grid-cols-12 w-full h-[100vh]">
    <aside
      class="w-full h-full col-span-2 bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div class="overflow-y-auto py-4 px-3">
        <ul class="space-y-2">
          <slot />
        </ul>
      </div>
    </aside>

    <div class="col-span-9 p-8">
      <slot :name="modelValue" />
    </div>
  </section>
</template>

<script setup lang='ts'>
const modelValue = ref('')
const updateModelValue = (value: string) => {
  modelValue.value = value
}

provide('updateModelValue', updateModelValue)
</script>
