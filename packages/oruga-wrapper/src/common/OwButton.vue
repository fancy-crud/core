<script lang="ts">
import { OButton } from '@oruga-ui/oruga-next'
import OwLoadingIcon from './OwLoadingIcon.vue'

export default defineComponent({
  props: {
    icon: { type: String, default: () => '' },
    borderless: { type: Boolean, default: () => false },
    isLoading: { type: Boolean, default: () => false },
  },

  setup(props, { attrs, slots }) {
    const defaultSlot = computed(() => {
      if (props.isLoading) {
        return {
          default: () => h(OwLoadingIcon, { isLoading: props.isLoading }),
        }
      }
      return {}
    })

    return () =>
      h(OButton, { ...attrs }, {
        ...defaultSlot.value,
        ...slots,
      })
  },
})
</script>
