/*
 * @Author: your name
 * @Date: 2020-12-12 11:44:22
 * @LastEditTime: 2020-12-12 14:15:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\utils\storage.js
 */

//  储存数据
export const setItem = (key, value) => {
	if (typeof value === 'object') {
		value = JSON.stringify(value)
	}
	window.localStorage.setItem(key, value)
}

// 获取数据

export const getItem = (key) => {
	const data = window.localStorage.getItem(key)
	try {
		return JSON.parse(data)
	} catch (key) {
		return data
	}
}

export const removeItem = (key) => {
	window.localStorage.removeItem(key)
}
