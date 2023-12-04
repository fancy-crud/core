// import './styles/index.sass'

import { form } from './form'
import { table } from './table'
import { common } from './common'

export * from './common'
export * from './form'
export * from './table'
export * from './config'

const components = {
  ...form,
  ...table,
  ...common,
}

export default components
