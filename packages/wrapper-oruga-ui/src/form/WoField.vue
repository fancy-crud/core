<script lang="ts">
import { OField } from '@oruga-ui/oruga-next'

export default defineComponent({
  props: {
    message: {
      type: String,
      default: () => '',
    },
  },
  setup(props, { attrs, slots }) {
    const hiddenHintMessage = 'HIDDEN_HINT_TO_PREVENT_DISPLAY_MOVEMENT'
    const hintMessage = computed(() => props.message === '' ? hiddenHintMessage : props.message)
    const hiddenHintClass = computed(() => hintMessage.value === hiddenHintMessage ? 'hidden-hint' : undefined)

    return () => h(OField, { ...attrs, message: hintMessage.value, messageClass: hiddenHintClass.value }, slots)
  },
})
</script>

<style lang="sass">
.hidden-hint
  opacity: 0
</style>
