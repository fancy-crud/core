import { NormalizePaginationCommand, NormalizePaginationHandler } from './normalizers/normalize-pagination'
import { NormalizeColumnsCommand, NormalizeColumnsHandler } from './normalizers/normalize-columns'
import { registerCommand } from '@/common/bus/capabilities'

registerCommand.execute(NormalizeColumnsCommand, NormalizeColumnsHandler)
registerCommand.execute(NormalizePaginationCommand, NormalizePaginationHandler)
