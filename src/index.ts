import type { App, Plugin } from 'vue'

import * as Forms from './forms/integration/components'
import * as Tables from './tables/integration/components'
import type { Options } from './config'
import { setFancyCrudConfig } from './config'

// install function executed by Vue.use()
export const FancyCrud: Plugin = function installFancyCrud(app: App, options: Partial<Options>) {
  const componentsList: [string, any][] = Object.entries({
    ...Forms,
    ...Tables,
  })

  componentsList.forEach(([key, module]) => {
    app.component(key, module.default)
  })

  // if (options.statusCodesHandlers)
  //   setStatusCodesHandlers(options.statusCodesHandlers)

  setFancyCrudConfig(options)
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './config'
export * from './common/integration'
// export * from './filters'
export * from './forms/integration'
export * from './http/integration'
// export * from './config'
export * from './tables/integration'

// eslint-disable-next-line import/first
import './styles/main.sass'
