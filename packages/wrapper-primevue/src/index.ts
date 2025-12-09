import { form } from './form'
import { table } from './table'
import { common } from './common'

export * from './config'
export * from './table'
export * from './common'
export * from './form'
export { default as FwToast } from './common/FwToast.vue'

export const components = {
  ...form,
  ...table,
  ...common,
}

export default components
