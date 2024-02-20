<script lang="ts">
import { getDefaults } from '@fancy-crud/core'
import { ElDialog } from 'element-plus'

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
      h(ElDialog, {
        ...defaults.value.modal,
        ...attrs,
        'modelValue': modelValue.value,
        'onUpdate:modelValue': (e: boolean) => modelValue.value = e,
      }, slots)
  },
})
</script>
