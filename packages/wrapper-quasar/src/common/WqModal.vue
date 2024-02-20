<script lang="ts">
import { getDefaults } from '@fancy-crud/core'
import { QCard, QCardSection, QDialog } from 'quasar'

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
      h(QDialog, {
        ...defaults.value.modal,
        ...attrs,
        'modelValue': modelValue.value,
        'onUpdate:modelValue': (e: boolean) => modelValue.value = e,
      }, {
        default: () => h(QCard, { ...(defaults.value.modalContent || {}) }, {
          default: () => h(QCardSection, undefined, slots),
        }),
      })
  },
})
</script>
