<script lang="ts">
import { fields } from '@fancy-crud/core'

export default defineComponent({
  setup(_, { attrs, slots }) {
    return () => h(fields.datepicker, attrs, slots)
  },
})
</script>
