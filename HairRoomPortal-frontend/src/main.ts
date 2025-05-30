import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// import { Button, NavBar ,Icon,Tabbar, TabbarItem} from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/es/toast/style';

import routes from './config/routes.ts';
import {createRouter, createWebHistory} from "vue-router";
import './global.css'
import {createPinia} from "pinia";
const app=createApp(App);

const router = createRouter({
    /* createMemoryHistory和createWebHashHistory不同，memory的地址栏不会变，
       不是根据url来变化页面的，使用History API管理路由状态，所以浏览器上看不到地址变化
     */
    // history: createMemoryHistory(),
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes,

})
const pinia = createPinia();
// app.use(Button);
// app.use(NavBar);
// app.use(Icon);
// app.use(Tabbar);
// app.use(TabbarItem);
app.use(Vant);
app.use(router);
app.use(pinia);
app.mount('#app');
