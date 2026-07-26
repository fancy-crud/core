<script lang="ts">
import { defineComponent, h } from 'vue'
import Button from 'primevue/button'

export default defineComponent({
  props: {
    isLoading: { type: Boolean, default: () => false },
  },

  setup(props, { attrs, slots }) {
    return () =>
      h(Button, {
        ...attrs,
        loading: props.isLoading,
      }, {
        ...slots,
      })
  },
})
</script>
