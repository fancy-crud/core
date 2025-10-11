<script lang="ts">
import { getDefaults } from '@fancy-crud/core'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    },
    form: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (_payload: boolean) => true,
  },
  setup(props: any, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)
    const defaults = computed(getDefaults)

    // Extract stack data passed from FModal (FModal handles all the logic)
    const inStack = computed(() => !!attrs['data-modal-in-stack'])
    const modalClasses = computed(() => {
      const classes = attrs['data-fancy-modal-classes']
      return typeof classes === 'string' ? classes : ''
    })
    const modalStyles = computed(() => {
      const styles = attrs['data-fancy-modal-styles']
      return typeof styles === 'object' && styles !== null ? styles : {}
    })
    const zIndex = computed(() => attrs['data-modal-zindex'])

    const handleOverlayClick = () => {
      modelValue.value = false
    }

    return () => {
      // If in stack, always render (for transitions). Otherwise, conditionally render
      const shouldRender = inStack.value || modelValue.value
      if (!shouldRender) return null

      // Build modal classes
      const classes = ['fancy-modal']
      if (modalClasses.value) {
        classes.push(...modalClasses.value.split(' ').filter(c => c))
      }
      if (!inStack.value && modelValue.value) {
        classes.push('fancy-modal-visible')
      }
      if (!modelValue.value) {
        classes.push('fancy-modal-closed')
      }

      return h('div', { class: 'fancy-modal-wrapper' }, [
        // Overlay (only visible when modal is open)
        modelValue.value ? h('div', {
          class: 'fancy-modal-overlay',
          style: { 
            zIndex: typeof zIndex.value === 'number' ? zIndex.value - 1 : 1000 
          },
          onClick: handleOverlayClick,
        }) : null,
        // Modal container
        h('div', {
          class: classes,
          style: modalStyles.value,
        }, [
          h('div', {
            class: `fancy-modal-content ${defaults.value.modal?.class || ''}`.trim(),
          }, slots.default ? slots.default() : []),
        ]),
      ])
    }
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

/* Modal content */
.fancy-modal-content {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: auto;
  display: flex;
  flex-direction: column;
}

/* ========== BASE MODAL CONTAINER (matching ModalContainer.vue) ========== */
.fancy-modal {
  position: fixed;
  top: 2rem;
  bottom: 4rem;
  width: 100%;
  max-width: 40rem;
  transition: transform 0.5s ease-in-out;
  z-index: 1001;
}

/* Closed modals - disable pointer events */
.fancy-modal-closed {
  pointer-events: none;
}

/* ========== NON-STACK MODAL (simple center modal) ========== */
.fancy-modal-visible {
  right: 2rem;
  transform: translateX(0);
  animation: slideInFromRight 0.5s ease-in-out;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(0);
  }
}

/* ========== CENTER POSITION (First modal in stack - active-first) ========== */
.fancy-modal-stack-center {
  right: 2rem;
  transform: translateX(100vw); /* Initially off-screen to the right */
}

.fancy-modal-stack-center.fancy-modal-open {
  transform: translateX(0); /* Slide to center position */
}

/* Shifted center modals */
.fancy-modal-stack-center.fancy-modal-shifted {
  right: 2rem;
  pointer-events: none;
  /* Transform is applied dynamically via inline styles for unlimited nesting */
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