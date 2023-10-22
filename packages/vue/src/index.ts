import type { App, Plugin } from 'vue'

import { IFormStore, IResponseInterceptorStore, IRuleOptionsStore, inject as injecting } from '@fancy-crud/core'
import * as Forms from './forms/components'
import * as Tables from './tables/components'
import * as Utils from './common/components'
import type { Options } from './config'
import { setFancyCrudConfig } from './config'

// install function executed by Vue.use()
export const FancyCrud: Plugin = function installFancyCrud(app: App, options: Partial<Options>) {
  const componentsList: [string, any][] = Object.entries({
    ...Forms,
    ...Tables,
    ...Utils,
  })

  componentsList.forEach(([key, module]) => {
    if (module.default)
      app.component(key, module.default)
    else
      app.component(key, module)
  })

  // if (options.statusCodesHandlers)
  //   setStatusCodesHandlers(options.statusCodesHandlers)

  setFancyCrudConfig(options)
  app.provide(IRuleOptionsStore.name, injecting(IRuleOptionsStore))
  app.provide(IResponseInterceptorStore.name, injecting(IResponseInterceptorStore))
  app.provide(IFormStore.name, injecting(IFormStore))
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@fancy-crud/core'
export * from './config'
export * from './common'
// export * from './filters'
export * from './forms'
export * from './http'
// export * from './config'
export * from './tables'

// eslint-disable-next-line import/first
import './styles/index.sass'
