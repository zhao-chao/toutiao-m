/*
 * @Author: your name
 * @Date: 2020-12-10 19:50:26
 * @LastEditTime: 2020-12-10 22:17:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\api\user.js
 */
/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
/**
 * 用户登录
 */
export const login = (data) => {
	return request({
		method: 'POST',
		url: '/app/v1_0/authorizations',
		data,
	})
}
