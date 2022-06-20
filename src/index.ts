
import { App, Plugin } from 'vue'

// import * as components from '@/components/index';
import { setHttpConfig } from '@/composables'
import './styles/main.sass'


const components: Record<string, any> = {}
// install function executed by Vue.use()
const install: Plugin = function installFancyCrud(app: App, options: any = {}) {

  Object.entries(import.meta.globEager('@/components/**/*.vue')).forEach(([key, value]) => {
    if (key.includes('/viewer/')) return

    const componentName = key.match(/[\w]+?(?=\.)/g)

    if (componentName) {
      components[componentName[0]] = value.default
      app.component(componentName[0], value.default)
    }
  })

  if (options.http) {
    setHttpConfig(options.http)
  }
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
// export * from '@/components';
export * from '@/composables'