/*
 * @Author: your name
 * @Date: 2020-12-14 16:49:56
 * @LastEditTime: 2020-12-14 17:02:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\utils\dayjs.js
 */
import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', (value) => {
	return dayjs().to(dayjs(value))
})
