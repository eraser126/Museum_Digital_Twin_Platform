import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'

// 引入 Ant Design Vue
import Antd from 'ant-design-vue';
// 引入 Ant Design Vue 的重置样式 (适用于 antd v4+)
// 如果你安装的是旧版本，可能是 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/reset.css'; 

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(ElementPlus)

// 注册 Ant Design Vue
app.use(Antd);

app.config.globalProperties.$echarts = echarts

app.mount('#app')
