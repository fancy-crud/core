import { exportComponents } from '@/common/integration'

export * from './composables'

export default exportComponents(import.meta.glob('./**/*.vue'))
