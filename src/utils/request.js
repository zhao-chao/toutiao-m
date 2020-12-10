/*
 * @Author: your name
 * @Date: 2020-12-10 14:47:27
 * @LastEditTime: 2020-12-10 14:47:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\utils\request.js
 */
/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
	baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
})

export default request
