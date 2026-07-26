<script setup>
import { computed, watch, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useModalStack } from '@/composables/useModalStack'

const props = defineProps({
  modalId: {
    type: String,
    required: true
  }
})

const { registerModal, unregisterModal, isModalOpen, getModalPosition, getModalZIndex } = useModalStack()

// Register modal on mount
onMounted(() => {
  registerModal(props.modalId)
})

onUnmounted(() => {
  unregisterModal(props.modalId)
})

// Reactive modal state
const isOpen = computed(() => isModalOpen(props.modalId))
const position = computed(() => getModalPosition(props.modalId))
const zIndex = computed(() => getModalZIndex(props.modalId))

// Animation state management
const showOpen = ref(false)

// Watch for modal opening/position changes to trigger proper animation sequence
watch([isOpen, position], async ([newOpen, newPos], [oldOpen, oldPos]) => {
  if (newOpen && !oldOpen) {
    // Modal is opening
    showOpen.value = false
    
    // If it's a subsequent modal (coming from left), set from-left class first
    if (newPos === 'active-left') {
      // Force browser to render from-left position before adding open class
      await nextTick()
    }
    
    // Add open class after small delay for smooth animation
    setTimeout(() => {
      showOpen.value = true
    }, 10)
  } else if (!newOpen && oldOpen) {
    // Modal is closing
    showOpen.value = false
  } else if (newOpen && oldOpen && newPos !== oldPos) {
    // Modal is already open but position changed (shifted in stack)
    // Position changes should be immediate, no delay
    showOpen.value = true
  }
}, { immediate: true })

// Extract shift level from position string (e.g., "shifted-3" -> 3)
const shiftLevel = computed(() => {
  const pos = position.value
  if (pos && pos.startsWith('shifted-')) {
    return parseInt(pos.replace('shifted-', ''))
  }
  return null
})

// Dynamic transform styles for shifted modals
const dynamicTransform = computed(() => {
  const level = shiftLevel.value
  if (level === null) return null
  
  // Calculate dynamic positioning based on shift level
  // Pattern: X increases by 5% each level, Y increases gradually
  const xOffset = 70 + (level * 5) // 75%, 80%, 85%, 90%, 95%, 100%, 105%...
  let yOffset = 0
  
  if (level >= 2) {
    yOffset = 2
  }
  if (level >= 3) {
    yOffset = 4
  }
  if (level >= 5) {
    yOffset = 4 + ((level - 4) * 1) // Gradually increase for deeper levels
  }
  
  return `translate(${xOffset}%, ${yOffset}%)`
})

// CSS classes based on position
const positionClasses = computed(() => {
  const pos = position.value
  const classes = []
  
  // Always include position-related classes when modal is in stack
  if (isOpen.value) {
    if (pos === 'active-first' || pos === 'active-left') {
      // Active modals get 'open' class (with delay via showOpen)
      if (showOpen.value) {
        classes.push('open')
      }
      
      // Subsequent modals also get 'from-left' for positioning
      if (pos === 'active-left') {
        classes.push('from-left')
      }
    } else if (shiftLevel.value !== null) {
      // Background stacked modals - use dynamic positioning
      classes.push('shifted')
    }
  } else {
    // Not open - add class to disable pointer events
    classes.push('modal-closed')
  }
  
  return classes.join(' ')
})

// Combined inline styles
const modalStyles = computed(() => {
  const styles = { zIndex: zIndex.value }
  
  // Apply dynamic transform for shifted modals
  if (shiftLevel.value !== null && dynamicTransform.value) {
    styles.transform = dynamicTransform.value
  }
  
  return styles
})
</script>

<template>
  <!-- Modal is always rendered, just positioned off-screen when not open -->
  <div 
    class="modal-container bg-white p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col justify-between"
    :class="positionClasses"
    :style="modalStyles"
  >
    <slot />
  </div>
</template>

<style scoped>
/* Base modal container styles - scalable system */
.modal-container {
  transition: transform 0.5s ease-in-out;
  transform: translateX(100vw); /* Initially off-screen to the right */
  position: fixed;
  top: 2rem;
  bottom: 4rem;
  right: 2rem;
  width: 100%;
  max-width: 40rem;
  z-index: 20;
}

.modal-container.open {
  transform: translateX(0); /* Slide to center position */
}

/* Dynamic shifting for carousel effect - transform calculated via inline styles */
.modal-container.shifted {
  pointer-events: none;
  /* Transform is applied dynamically via inline styles for unlimited nesting */
}

/* Initial position for new modals - start from far left */
.modal-container.from-left {
  transform: translateX(calc(-200% - 4rem)); /* Start from far left, off-screen */
}

/* When opening from left, animate to final left position */
.modal-container.from-left.open {
  transform: translateX(calc(-25% - 1rem)); /* Animate to final left position */
}

/* Closed modals - disable pointer events */
.modal-container.modal-closed {
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-container {
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
  
  .modal-container.shifted {
    transform: translateX(0) !important;
    top: calc(2rem + var(--mobile-offset, 0) * 5rem);
  }
}
</style>

