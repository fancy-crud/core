import { ReturnObject } from '@fancy-crud/vue'
import WqTableBody from './WqTableBody.vue'
import WqTableFooter from './WqTableFooter.vue'

export const table = ReturnObject({
  tableBody: WqTableBody,
  tableFooter: WqTableFooter,
})

export {
  WqTableBody,
  WqTableFooter,
}
