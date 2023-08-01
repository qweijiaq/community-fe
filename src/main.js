// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import './utils/veevalidate'

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3333' : 'http://your.domain.com'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)

app.mount('#app')
