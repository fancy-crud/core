import type { RequestDefaultOptions } from '../axioma'

export function onSuccess(response: unknown, options?: RequestDefaultOptions) {
  if (typeof options?.onSuccess === 'function')
    options?.onSuccess(response)
}

export function onFailed(error: unknown, options?: RequestDefaultOptions) {
  if (typeof options?.onFailed === 'function')
    options?.onFailed(error)
}

export function onFinally(options?: RequestDefaultOptions) {
  if (typeof options?.onFinally === 'function')
    options?.onFinally()
}
