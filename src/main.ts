import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index";
import {createPinia} from "pinia";
import AMapLoader from "@amap/amap-jsapi-loader";

const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(router)
app.mount('#app')

