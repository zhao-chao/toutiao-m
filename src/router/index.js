/*
 * @Author: your name
 * @Date: 2020-12-09 16:10:29
 * @LastEditTime: 2020-12-21 22:34:07
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
	{
		path: '/article/:articleId',
		name: 'article',
		component: () => import('@/views/article'),
		// 将路由动态参数映射到组件的 props 中，更推荐这种做法
		props: true,
	},
	{
		path: '/user/profile',
		name: 'user-porfile',
		component: () => import('@/views/user-profile'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
