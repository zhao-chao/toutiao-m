/*
 * @Author: your name
 * @Date: 2020-12-17 22:03:36
 * @LastEditTime: 2020-12-17 23:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\api\search.js
 */
import request from '@/utils/request'

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestion = (q) => {
	return request({
		method: 'GET',
		url: '/app/v1_0/suggestion',
		params: {
			q,
		},
	})
}
/**
 * 获取搜索结果
 */
export function getSearch(params) {
	return request({
		method: 'GET',
		url: '/app/v1_0/search',
		params,
	})
}
