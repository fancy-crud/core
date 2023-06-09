<script lang="ts">
import { OButton } from '@oruga-ui/oruga-next'
import LoadingIcon from './LoadingIcon.vue'

export default defineComponent({
  props: {
    icon: { type: String, default: () => '' },
    borderless: { type: String, default: () => '' },
    isLoading: { type: Boolean, default: () => false },
  },

  setup(props, { attrs, slots }) {
    const pack = computed(() => {
      if (attrs.pack)
        return attrs.pack

      return 'mdi'
    })

    return () =>
      h(OButton, { ...attrs, pack, iconRight: props.icon, inverted: props.borderless }, {
        default: () => h(LoadingIcon, { isLoading: props.isLoading }),
        ...slots,
      })
  },
})
</script>
