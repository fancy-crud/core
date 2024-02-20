<script lang="ts">
import { components } from '@fancy-crud/core'

export default defineComponent({
  setup(_, { attrs, slots }) {
    return () => h(components.color, attrs, slots)
  },
})
</script>
