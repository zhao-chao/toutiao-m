/*
 * @Author: your name
 * @Date: 2020-12-09 16:10:29
 * @LastEditTime: 2020-12-12 14:19:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\store\index.js
 */
import Vue from 'vue'

import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
	state: {
		// 用户的登录状态信息
		// user: JSON.parse(window.localStorage.getItem('TOKEN_KEY')),
		// user: null,
		user: getItem(TOKEN_KEY),
	},
	mutations: {
		setUser(state, data) {
			state.user = data
			// window.localStorage.setItem('TOKEN_KEY', JSON.stringify(user))
			setItem(TOKEN_KEY, state.user)
		},
	},
	actions: {},
	modules: {},
})
