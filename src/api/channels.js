/*
 * @Author: your name
 * @Date: 2020-12-15 21:32:09
 * @LastEditTime: 2020-12-16 14:46:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\api\channels.js
 */

import request from '@/utils/request'
/**
 * 获取所有频道
 */
export const getAllChannels = () => {
	return request({
		method: 'GET',
		url: '/app/v1_0/channels',
	})
}
/**
 * 添加用户频道
 */
export const addUserChannel = (channel) => {
	return request({
		method: 'PATCH',
		url: '/app/v1_0/user/channels',
		data: {
			channels: [channel],
		},
	})
}
/**
 * 删除用户频道
 */
export const deleteUserChannel = (channelId) => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/user/channels/${channelId}`,
	})
}
