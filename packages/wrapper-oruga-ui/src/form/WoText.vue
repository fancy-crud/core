<script lang="ts">
import { OInput } from '@oruga-ui/oruga-next'
import type { NormalizedTextField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useTextField } from '@fancy-crud/vue'

import WoField from './WoField.vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedTextField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hasFieldErrors, hintText, vmodel } = useTextField(props)
    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    return () =>
      h(WoField, { label: props.field.label, message: hintText.value, variant: variant.value, ...props.field.wrapper }, {
        default: () => h(OInput, { ...attrs, ...props.field, ...vmodel.value }),
        ...slots,
      })
  },
})
</script>

