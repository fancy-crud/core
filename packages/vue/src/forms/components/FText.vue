<script lang="ts">
import { defineComponent } from 'vue'
import { components } from '@fancy-crud/core'

export default defineComponent({
  setup(_, { attrs, slots }) {
    return () => h(components.text, attrs, slots)
  },
})
</script>
