import { ReturnObject } from '@fancy-crud/vue'
import FwTableBody from './FwTableBody.vue'
import FwTableFooter from './FwTableFooter.vue'

export const table = ReturnObject({
  tableBody: FwTableBody,
  tableFooter: FwTableFooter,
})

export {
  FwTableBody,
  FwTableFooter,
}
