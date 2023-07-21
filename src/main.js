// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://your.domain.com'

const app = createApp(App)
app.use(router)

app.mount('#app')
