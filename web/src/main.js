import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router';
import 'element-plus/dist/index.css'
import * as Functions from './functions'
const app = createApp(App)
Object.assign(app.config.globalProperties, Functions);
app.use(ElementPlus)
app.use(router)
app.mount('#app')