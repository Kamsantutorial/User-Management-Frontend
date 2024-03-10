import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import './assets/styles/main.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(Antd).mount('#app')
