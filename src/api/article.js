/*
 * @Author: your name
 * @Date: 2020-12-13 15:51:15
 * @LastEditTime: 2020-12-18 15:34:59
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
