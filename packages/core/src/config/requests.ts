import type { HandleRequestStatusCodes } from '@packages/core/common/http/axioma'

const statusCodes: HandleRequestStatusCodes = {}

export function getStatusCodesHandlers() {
  return statusCodes
}

export function setStatusCodesHandlers(handlers: HandleRequestStatusCodes) {
  Object.assign(statusCodes, handlers)
}

