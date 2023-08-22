import type { App, Plugin } from 'vue'

import { IFormStore, IResponseInterceptorStore, IRuleOptionsStore, inject as fancyInjection } from '@fancy-crud/core'
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
    app.component(key, module.default)
  })

  // if (options.statusCodesHandlers)
  //   setStatusCodesHandlers(options.statusCodesHandlers)

  setFancyCrudConfig(options)
  app.provide(IRuleOptionsStore.name, fancyInjection(IRuleOptionsStore))
  app.provide(IResponseInterceptorStore.name, fancyInjection(IResponseInterceptorStore))
  app.provide(IFormStore.name, fancyInjection(IFormStore))
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './config'
export * from './common'
// export * from './filters'
export * from './forms'
export * from './http'
// export * from './config'
export * from './tables'

// eslint-disable-next-line import/first
import './styles/index.sass'
