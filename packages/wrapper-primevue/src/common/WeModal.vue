<script lang="ts">
import { getDefaults } from '@fancy-crud/core'
import Dialog from 'primevue/dialog'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: {
    'update:modelValue': (_payload: boolean) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)

    const defaults = computed(getDefaults)

    return () =>
      h(Dialog, {
        ...defaults.value.modal,
        ...attrs,
        'visible': modelValue.value,
        'onUpdate:visible': (e: boolean) => modelValue.value = e,
        modal: true,
      }, slots)
  },
})
</script>
