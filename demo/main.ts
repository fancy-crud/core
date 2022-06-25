import { createApp } from 'vue'
import axios from 'axios'
import FancyCrud from '../src/index'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css'
import 'flowbite';
import '../src/styles/main.sass'

axios.defaults.baseURL = 'http://localhost:9000/api/'

const app = createApp(App)
app.use(FancyCrud, {
    http: { axios },
})

app.mount('#app')
