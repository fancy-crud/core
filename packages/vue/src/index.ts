import './styles/index.sass'
import type { App, Plugin } from 'vue'

import type { Config } from '@fancy-crud/core'
import {
  IFormStore,
  IResponseInterceptorStore,
  IRuleConfigStore,
  inject as injecting,
  setupConfig,
} from '@fancy-crud/core'
import * as Forms from './forms/components'
import * as Tables from './tables/components'
import * as Utils from './common/components'

// install function executed by Vue.use()
export const FancyCrud: Plugin = function install(app: App, options: Config) {
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

  setupConfig(options)
  app.provide(IRuleConfigStore.name, injecting(IRuleConfigStore))
  app.provide(IResponseInterceptorStore.name, injecting(IResponseInterceptorStore))
  app.provide(IFormStore.name, injecting(IFormStore))
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@fancy-crud/core'
export * from './common'
// export * from './filters'
export * from './forms'
export * from './http'
export * from './tables'
