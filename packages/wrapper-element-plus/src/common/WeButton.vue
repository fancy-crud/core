<script lang="ts">
import { ElButton } from 'element-plus'

export default defineComponent({
  props: {
    isLoading: { type: Boolean, default: () => false },
  },

  setup(props, { attrs, slots }) {
    return () =>
      h(ElButton, {
        ...attrs,
        tag: 'a',
        loading: props.isLoading,
      }, {
        ...slots,
      })
  },
})
</script>
