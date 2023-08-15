import type { HandleRequestStatusCodes } from '@/common/http/axioma'

const statusCodes: HandleRequestStatusCodes = {}

export function getStatusCodesHandlers() {
  return statusCodes
}

export function setStatusCodesHandlers(handlers: HandleRequestStatusCodes) {
  Object.assign(statusCodes, handlers)
}

