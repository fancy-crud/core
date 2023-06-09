import { exportComponents } from '@/common/integration'

export * from './common'
export * from './fields'
export * from './table'
export * from './config'

export default exportComponents(import.meta.glob('./**/*.vue'))
