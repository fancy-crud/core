<script lang="ts">
import { VBtn } from 'vuetify/components'

export default defineComponent({
  props: {
    isLoading: { type: Boolean, default: () => false },
  },

  setup(props, { attrs, slots }) {
    return () =>
      h(VBtn, {
        ...attrs,
        loading: props.isLoading,
      }, {
        ...slots,
      })
  },
})
</script>
