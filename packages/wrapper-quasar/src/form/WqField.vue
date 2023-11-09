<script lang="ts">
import { QField } from 'quasar'

export default defineComponent({
  setup(_, { attrs, slots }) {
    return () => h(QField, { ...attrs }, slots)
  },
})
</script>

<style lang="sass">
.hidden-hint
  opacity: 0
</style>
