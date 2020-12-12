/*
 * @Author: your name
 * @Date: 2020-12-09 16:10:29
 * @LastEditTime: 2020-12-10 15:41:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
