import { ReturnObject } from '@fancy-crud/vue'
import WvTableBody from './WvTableBody.vue'
import WvTableFooter from './WvTableFooter.vue'

export const table = ReturnObject({
  tableBody: WvTableBody,
  tableFooter: WvTableFooter,
})

export {
  WvTableBody,
  WvTableFooter,
}
