<script lang="ts">
import { OButton } from '@oruga-ui/oruga-next'
import LoadingIcon from './LoadingIcon.vue'

export default defineComponent({
  props: {
    icon: { type: String, default: () => '' },
    borderless: { type: Boolean, default: () => false },
    isLoading: { type: Boolean, default: () => false },
  },

  setup(props, { attrs, slots }) {
    const pack = computed(() => {
      if (attrs.pack)
        return attrs.pack

      return 'mdi'
    })

    const defaultSlot = computed(() => {
      if (props.isLoading) {
        return {
          default: () => h(LoadingIcon, { isLoading: props.isLoading }),
        }
      }
      return {}
    })

    return () =>
      h(OButton, { ...attrs, pack, iconRight: props.icon, inverted: props.borderless }, {
        ...defaultSlot.value,
        ...slots,
      })
  },
})
</script>
