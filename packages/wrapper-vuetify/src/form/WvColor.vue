<script lang="ts">
import type { NormalizedColorField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { VColorPicker } from 'vuetify/components'
import { useColorField } from '@fancy-crud/vue'

import WvField from './WvField.vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedColorField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hintText, vmodel } = useColorField(props)

    return () =>
      h(WvField, { ...props.field.wrapper, label: props.field.label, hint: hintText.value, errorMessages: props.field.errors }, {
        default: () => h(VColorPicker as any, { ...attrs, ...props.field, ...vmodel.value }, slots),
      })
  },
})
</script>
