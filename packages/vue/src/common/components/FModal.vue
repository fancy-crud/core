<script lang="ts">
import { utils } from '@fancy-crud/core'

export default defineComponent({
  setup(_, { attrs, slots }) {
    return () => h(utils.modal, attrs, slots)
  },
})
</script>
