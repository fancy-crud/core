import 'element-plus/dist/index.css'
import { Delete, Download, Edit, Plus } from '@element-plus/icons-vue'
import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'

import ElementPlus from 'element-plus'

import fancyConfig from './plugins/fancy-crud'

import App from './App.vue'
import './styles/main.sass'

const app = createApp(App)

app.component('Plus', Plus)
app.component('Download', Download)
app.component('Edit', Edit)
app.component('Delete', Delete)
app.use(ElementPlus)

app.use(FancyCrud, fancyConfig)

app.mount('#app')
