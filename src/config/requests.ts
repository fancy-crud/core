import type { HandleRequestStatusCodes } from '@/http/core'

const statusCodes: HandleRequestStatusCodes = {}

export function getStatusCodesHandlers() {
  return statusCodes
}

export function setStatusCodesHandlers(handlers: HandleRequestStatusCodes) {
  Object.assign(statusCodes, handlers)
}

