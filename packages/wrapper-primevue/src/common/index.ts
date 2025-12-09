import { ReturnObject, FModalContent } from '@fancy-crud/vue'
import FwButton from './FwButton.vue'

export * from './notify'

export const common = ReturnObject({
  button: FwButton,
  modal: FModalContent,
})

export {
  FwButton,
  FModalContent,
}
