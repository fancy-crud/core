import { ReturnObject } from '@fancy-crud/vue'
import OwButton from './OwButton.vue'
import OwModal from './OwModal.vue'
import OwLoadingIcon from './OwLoadingIcon.vue'

export const common = ReturnObject({
  button: OwButton,
  modal: OwModal,
})

export {
  OwButton,
  OwModal,
  OwLoadingIcon,
}
