import type { Proxy } from '@packages/vue/common'

export function useProxies<T extends Record<string, any>>(proxies: unknown[], deep: boolean[]) {
  const proxiesCollection: Proxy[] = []

  const _proxies = proxies.map((proxy, index) => {
    const fn: any = typeof proxy === 'function' ? proxy : () => proxy
    const target = reactive(fn() || {}) as Record<string, any>

    proxiesCollection.push({ fn, target, isDeep: deep[index] })

    return target
  }) as unknown as T

  function createProxy<T>(form: T) {
    proxiesCollection.forEach((proxy) => {
      if (proxy.isDeep) {
        watch(() => proxy.fn(form), (value: any) => {
          Object.keys(value).forEach((key) => {
            Object.assign(proxy.target[key], value[key])
          })
        })
        return
      }
      watch(() => proxy.fn(form), (value: any) => {
        Object.assign(proxy.target, value)
      })
    })
  }

  return {
    createProxy,
    proxies: _proxies,
  }
}
