<script setup>
import { computed } from 'vue'
import { useModalStack } from '@/composables/useModalStack'

const { hasModalsOpen, modalStack, closeAllModals } = useModalStack()

const handleOverlayClick = (e) => {
  if (e.target === e.currentTarget && modalStack.value.length === 1) {
    closeAllModals()
  }
}
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="hasModalsOpen"
      class="fixed inset-0 bg-black/10 z-10"
      @click="handleOverlayClick"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

