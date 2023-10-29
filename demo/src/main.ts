import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'

// import { createVuetify } from 'vuetify'
import Oruga from '@oruga-ui/oruga-next'

// import fancyVuetifyConfig from './plugins/fancy-crud-vuetify'
import fancyOrugaConfig from './plugins/fancy-crud-oruga'

import App from './App.vue'

// import 'vuetify/styles'
import './styles/main.sass'

// const vuetify = createVuetify()
const app = createApp(App)

app.use(Oruga, {
  // ...bulmaConfig,
  modal: {
    contentClass: 'p-4',
  },
})

// app.use(vuetify)

// app.use(FancyCrud, fancyVuetifyConfig)
app.use(FancyCrud, fancyOrugaConfig)

app.mount('#app')
