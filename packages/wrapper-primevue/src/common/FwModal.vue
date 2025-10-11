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
      
      // Add user's custom classes from defaults
      if (defaults.value.modal?.class) {
        classes.push(defaults.value.modal.class)
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
        // Modal container - slot goes directly here (no content wrapper)
        h('div', {
          class: classes,
          style: modalStyles.value,
        }, slots.default ? slots.default() : []),
      ])
    }
  },
})
</script>