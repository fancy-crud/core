<script lang="ts">
import { ElFormItem } from 'element-plus'

export default defineComponent({
  props: {
    message: {
      type: String,
      default: () => '',
    },
    hasFieldErrors: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { attrs, slots }) {
    const computedError = computed(() => props.hasFieldErrors ? props.message : undefined)
    return () => h(ElFormItem, { ...attrs, error: computedError.value, inlineMessage: props.message }, slots)
  },
})
</script>

<style lang="sass">
.hidden-hint
  opacity: 0
</style>
