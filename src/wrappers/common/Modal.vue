<script lang="ts">
import { OModal } from '@oruga-ui/oruga-next'

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

    return () =>
      h(OModal, { ...attrs, 'active': modelValue.value, 'onUpdate:active': (e: boolean) => modelValue.value = e, 'width': '640' }, slots)
  },
})
</script>
