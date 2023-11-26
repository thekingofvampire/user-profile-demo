import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import route from './router/router';
import './tailwind.css';

const DemoApp = createApp(App);

DemoApp.use(route).use(Antd).mount('#app');
