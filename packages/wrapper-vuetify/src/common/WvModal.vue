<script lang="ts">
import { getDefaults } from '@fancy-crud/core'
import { VCard, VCardText, VDialog } from 'vuetify/components'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: {
    'update:modelValue': (_payload: boolean) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)

    const defaults = computed(getDefaults)

    return () =>
      h(VDialog, {
        ...defaults.value.modal,
        ...attrs,
        'modelValue': modelValue.value,
        'onUpdate:modelValue': (e: boolean) => modelValue.value = e,
      }, {
        default: () => h(VCard, undefined, {
          default: () => h(VCardText, undefined, slots),
        }),
      })
  },
})
</script>
