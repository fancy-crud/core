import { ReturnObject } from '@fancy-crud/vue'
import WqButton from './WqButton.vue'
import WqModal from './WqModal.vue'
export * from './notify'
// import WqLoadingIcon from './WqLoadingIcon.vue'

export const common = ReturnObject({
  button: WqButton,
  modal: WqModal,
})

export {
  WqButton,
  WqModal,
  // WqLoadingIcon,
}
