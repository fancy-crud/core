<script lang="ts">
import { VInput } from 'vuetify/components'

export default defineComponent({
  setup(_, { attrs, slots }) {
    return () => h(VInput, { ...attrs }, slots)
  },
})
</script>

<style lang="sass">
.hidden-hint
  opacity: 0
</style>
