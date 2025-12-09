<script lang="ts">
import { computed, watch, onMounted, onUnmounted, defineComponent, PropType, ref, nextTick, h } from 'vue'
import { components } from '@fancy-crud/core'
import { useModalStack, type ModalStackPosition } from '../composables/useModalStack'

export default defineComponent({
  props: {
    modalId: {
      type: String,
      default: null,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    stackPosition: {
      type: String as PropType<ModalStackPosition>,
      default: 'center',
      validator: (value: string) => ['left', 'center', 'right'].includes(value),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots }) {
    // Stack management (only if modalId provided)
    const modalStack = props.modalId ? useModalStack() : null

    // Register modal if modalId provided
    if (props.modalId) {
      onMounted(() => {
        modalStack?.registerModal(props.modalId!, {
          position: props.stackPosition,
        })
      })
      onUnmounted(() => modalStack?.unregisterModal(props.modalId!))

      // Sync v-model with stack
      watch(() => props.modelValue, (isOpen) => {
        if (props.modalId) {
          modalStack?.syncWithVModel(props.modalId, isOpen)
        }
      })
    }

    // Stack-aware reactive state
    const stackPosition = computed(() => modalStack?.getModalPosition(props.modalId!) || null)
    
    // Animation state management (matching ModalContainer.vue)
    const showOpen = ref(false)

    // Watch for modal opening/position changes to trigger proper animation sequence
    watch([() => props.modelValue, stackPosition], async ([newOpen, newPos], [oldOpen, oldPos]) => {
      if (!props.modalId) return // Not in stack, skip animation logic
      
      if (newOpen && !oldOpen) {
        // Modal is opening
        showOpen.value = false
        
        // If it's a subsequent modal (coming from left/right), set initial position first
        if (newPos === 'active-left' || newPos === 'active-right') {
          // Force browser to render initial position before adding open class
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
      const pos = stackPosition.value
      if (pos && typeof pos === 'string') {
        if (pos.startsWith('shifted-left-')) {
          return parseInt(pos.replace('shifted-left-', ''))
        }
        if (pos.startsWith('shifted-')) {
          return parseInt(pos.replace('shifted-', ''))
        }
      }
      return null
    })

    // Calculate dynamic transform for shifted modals (matching ModalContainer.vue)
    const dynamicTransform = computed(() => {
      const level = shiftLevel.value
      if (level === null) return null
      
      const pos = stackPosition.value
      const isLeftStack = pos && typeof pos === 'string' && pos.startsWith('shifted-left-')
      const isCenterStack = props.stackPosition === 'center'
      
      // Calculate dynamic positioning based on shift level
      let xOffset: number
      let yOffset = 0
      
      if (isCenterStack) {
        // Center stack: smaller shift (25% base, increases by 5% each level)
        // Pattern: 25%, 30%, 35%, 40%, 45%...
        xOffset = 20 + (level * 5) // Shows 75% of background modals
      } else {
        // Left/Right stack: larger shift (75% base, increases by 5% each level)
        // Pattern: 75%, 80%, 85%, 90%, 95%, 100%, 105%...
        xOffset = 70 + (level * 5) // Shows 25% of background modals
      }
      
      if (level >= 2) {
        yOffset = 2
      }
      if (level >= 3) {
        yOffset = 4
      }
      if (level >= 5) {
        yOffset = 4 + ((level - 4) * 1) // Gradually increase for deeper levels
      }
      
      // Apply direction based on stack position
      if (isCenterStack) {
        // Center stack: maintain centering while shifting right
        return `translate(calc(-50% + ${xOffset}%), ${yOffset}%)`
      } else if (isLeftStack) {
        // Left stack: shift to the left
        return `translate(-${xOffset}%, ${yOffset}%)`
      } else {
        // Right stack: shift to the right
        return `translate(${xOffset}%, ${yOffset}%)`
      }
    })

    // CSS classes based on position (matching ModalContainer.vue)
    const positionClasses = computed(() => {
      if (!props.modalId) return [] // Not in stack
      
      const pos = stackPosition.value
      const stackPos = props.stackPosition
      const classes = []
      
      // Stack position class
      classes.push(`fancy-modal-stack-${stackPos}`)
      
      // Position-based classes
      if (props.modelValue) {
        if (pos === 'active-first' || pos === 'active-left' || pos === 'active-right') {
          // Active modals get 'open' class (with delay via showOpen)
          if (showOpen.value) {
            classes.push('fancy-modal-open')
          }
          
          // Position-specific classes
          if (pos === 'active-left') {
            classes.push('fancy-modal-from-left')
          } else if (pos === 'active-right') {
            classes.push('fancy-modal-from-right')
          }
        } else if (shiftLevel.value !== null) {
          // Background stacked modals
          classes.push('fancy-modal-shifted')
        }
      } else {
        // Not open
        classes.push('fancy-modal-closed')
      }
      
      return classes
    })

    // Calculate modal inline styles
    const modalStyles = computed(() => {
      const styles: any = {}
      
      // Stack-specific styles
      if (props.modalId) {
        const zIndex = modalStack?.getModalZIndex(props.modalId!)
        if (zIndex) {
          styles.zIndex = zIndex
        }

        // Apply dynamic transform for shifted modals
        if (shiftLevel.value !== null && dynamicTransform.value) {
          styles.transform = dynamicTransform.value
        }
      }
      
      // Merge with user-provided styles from attrs
      if (attrs.style && typeof attrs.style === 'object') {
        Object.assign(styles, attrs.style)
      }

      return styles
    })

    // Computed props to pass to wrapper
    const wrapperProps = computed(() => {
      // Exclude 'style' from attrs since we handle it in modalStyles
      const { style, ...restAttrs } = attrs
      
      const base = {
        ...props,
        ...restAttrs,
      }

      // Add stack-specific props if in stack
      if (props.modalId && modalStack) {
        return {
          ...base,
          'data-modal-id': props.modalId,
          'data-modal-position': stackPosition.value,
          'data-modal-zindex': modalStack.getModalZIndex(props.modalId),
          'data-modal-stack-position': props.stackPosition,
          'data-modal-in-stack': true,
          'data-fancy-modal-classes': positionClasses.value.join(' '),
          'data-fancy-modal-styles': modalStyles.value,
        }
      }

      return {
        ...base,
        'data-fancy-modal-styles': modalStyles.value,
      }
    })

    return () => h(components.modal, wrapperProps.value, slots)
  },
})
</script>

<style>
/* Overlay */
.fancy-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* ========== BASE MODAL CONTAINER ========== */
.fancy-modal {
  position: fixed;
  top: 2rem;
  bottom: 4rem;
  width: 100%;
  max-width: 40rem;
  transition: transform 0.5s ease-in-out;
  z-index: 1001;
  
  /* Minimal default styling - can be overridden by user classes */
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: auto;
}

/* Closed modals - disable pointer events */
.fancy-modal-closed {
  pointer-events: none;
}

/* ========== NON-STACK MODAL (simple center modal - default centered) ========== */
.fancy-modal-visible {
  left: 50%;
  transform: translateX(-50%);
  animation: slideInFromRightCenter 0.5s ease-in-out;
}

@keyframes slideInFromRightCenter {
  from {
    transform: translateX(calc(-50% + 100vw));
  }
  to {
    transform: translateX(-50%);
  }
}

/* ========== CENTER POSITION (First modal in stack - active-first) ========== */
.fancy-modal-stack-center {
  left: 50%;
  transform: translateX(calc(-50% + 100vw)); /* Initially off-screen to the right, but centered */
}

.fancy-modal-stack-center.fancy-modal-open {
  transform: translateX(-50%); /* Slide to center position */
}

/* Shifted center modals */
.fancy-modal-stack-center.fancy-modal-shifted {
  left: 50%;
  pointer-events: none;
  /* Transform is applied dynamically via inline styles for unlimited nesting */
  /* Note: inline transform from JS will override the translateX(-50%) */
}

/* ========== RIGHT POSITION STACK ========== */
.fancy-modal-stack-right {
  right: 2rem;
  transform: translateX(100vw); /* Initially off-screen to the right */
}

.fancy-modal-stack-right.fancy-modal-open {
  transform: translateX(0); /* Slide to right position */
}

/* Initial position for new modals coming from far left */
.fancy-modal-stack-right.fancy-modal-from-right {
  transform: translateX(calc(-200% - 4rem)); /* Start from far left, off-screen */
}

/* When opening from left, animate to final right position */
.fancy-modal-stack-right.fancy-modal-from-right.fancy-modal-open {
  transform: translateX(calc(-25% - 1rem)); /* Animate to final left-offset position */
}

/* Shifted right modals */
.fancy-modal-stack-right.fancy-modal-shifted {
  pointer-events: none;
  /* Transform is applied dynamically via inline styles for unlimited nesting */
}

/* ========== LEFT POSITION STACK ========== */
.fancy-modal-stack-left {
  left: 2rem;
  transform: translateX(-100vw); /* Initially off-screen to the left */
}

.fancy-modal-stack-left.fancy-modal-open {
  transform: translateX(0); /* Slide to left position */
}

/* Initial position for new modals coming from far right */
.fancy-modal-stack-left.fancy-modal-from-left {
  transform: translateX(calc(200% + 4rem)); /* Start from far right, off-screen */
}

/* When opening from right, animate to final left position */
.fancy-modal-stack-left.fancy-modal-from-left.fancy-modal-open {
  transform: translateX(calc(25% + 1rem)); /* Animate to final right-offset position */
}

/* Shifted left modals */
.fancy-modal-stack-left.fancy-modal-shifted {
  pointer-events: none;
  /* Transform is applied dynamically via inline styles for unlimited nesting */
}

/* ========== RESPONSIVE: MOBILE ========== */
@media (max-width: 768px) {
  .fancy-modal {
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
  
  .fancy-modal.fancy-modal-shifted {
    transform: translateX(0) !important;
    top: calc(2rem + var(--mobile-offset, 0) * 5rem);
  }
}
</style>
