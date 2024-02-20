import type { RequestDefaultOptions } from './typing'

export function onSuccess(response: any, options?: RequestDefaultOptions) {
  if (typeof options?.onSuccess === 'function')
    options?.onSuccess(response)
}

export function onFailed(error: any, options?: RequestDefaultOptions) {
  if (typeof options?.onFailed === 'function')
    options?.onFailed(error)
}

export function onFinally(options?: RequestDefaultOptions) {
  if (typeof options?.onFinally === 'function')
    options?.onFinally()
}
