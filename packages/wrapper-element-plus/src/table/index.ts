import { ReturnObject } from '@fancy-crud/vue'
import WeTableBody from './WeTableBody.vue'
import WeTableFooter from './WeTableFooter.vue'

export const table = ReturnObject({
  tableBody: WeTableBody,
  tableFooter: WeTableFooter,
})

export {
  WeTableBody,
  WeTableFooter,
}
