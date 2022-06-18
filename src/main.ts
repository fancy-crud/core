import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { http, i18n } from '@/composables'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.sass'
import 'flowbite';


axios.defaults.baseURL = 'http://localhost:9000/api/'

Object.assign(http, { axios })

const app = createApp(App)

app.use(i18n)

app.mount('#app')
