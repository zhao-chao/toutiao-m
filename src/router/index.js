/*
 * @Author: your name
 * @Date: 2020-12-09 16:10:29
 * @LastEditTime: 2020-12-16 16:13:48
 * @LastEditors: Please set LastEditors
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
	{
		path: '/',
		// name: 'layout',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '', // 默认子路由
				name: 'home',
				component: () => import('@/views/home'),
			},
			{
				path: '/qa',
				name: 'qa',
				component: () => import('@/views/qa'),
			},
			{
				path: '/video',
				name: 'video',
				component: () => import('@/views/video'),
			},
			{
				path: '/my',
				name: 'my',
				component: () => import('@/views/my'),
			},
		],
	},
	{
		path: '/search',
		nameL: 'search',
		component: () => import('@/views/search'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
