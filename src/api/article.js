/*
 * @Author: your name
 * @Date: 2020-12-13 15:51:15
 * @LastEditTime: 2020-12-20 11:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\api\article.js
 */
/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
 * 获取频道的文章列表
 */
export const getArticles = (params) => {
	return request({
		method: 'GET',
		url: '/app/v1_1/articles',
		params,
	})
}

/**
 * 获取频道的文章列表
 */
export const getArticleById = (articleId) => {
	return request({
		method: 'GET',
		url: '/app/v1_0/articles/' + articleId,
	})
}
/**
 * 收藏文章
 */
export const addCollect = (target) => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/collections',
		data: {
			target,
		},
	})
}

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/article/collections/${target}`,
	})
}
/**
 * 点赞
 */
export const addLike = (articleId) => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/likings',
		data: {
			target: articleId,
		},
	})
}

/**
 * 取消点赞
 */
export const deleteLike = (articleId) => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/article/likings/${articleId}`,
	})
}
