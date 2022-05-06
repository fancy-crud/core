import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { http } from '@/composables'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.sass'
import 'flowbite';

axios.defaults.baseURL = 'http://localhost:9000/api/'

Object.assign(http, { axios })

const app = createApp(App)

// Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, isClient: true, router, initialState: {} }))

app.mount('#app')
