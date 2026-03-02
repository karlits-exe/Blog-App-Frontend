import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'
import router from './router';
import "notyf/notyf.min.css";
const pinia = createPinia();

    
const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount('#app')
