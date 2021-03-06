/*
 * @Author: your name
 * @Date: 2020-12-09 16:10:29
 * @LastEditTime: 2020-12-14 16:56:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant 核心组件库
import Vant from 'vant'

// 加载vant 全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 加载动态设置 rem 基准值
import 'amfe-flexible'

// 加载 dayjs 初始化配置
import './utils/dayjs'

// 注册使用 vant 组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
