import { ReturnObject } from '@fancy-crud/vue'
import WoTableBody from './WoTableBody.vue'
import WoTableFooter from './WoTableFooter.vue'

export const table = ReturnObject({
  tableBody: WoTableBody,
  tableFooter: WoTableFooter,
})

export {
  WoTableBody,
  WoTableFooter,
}
