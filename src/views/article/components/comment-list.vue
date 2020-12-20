<!--
 * @Author: your name
 * @Date: 2020-12-20 11:39:57
 * @LastEditTime: 2020-12-20 17:31:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\article\components\comment-list.vue
-->
<template>

  <van-list v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error="error"
            error-text="加载失败"
            @load="onLoad">
    <comment-item v-for="(item ,index) in list"
                  :key="index"
                  :comment='item' />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'

import CommentItem from './comment-item'
import commentItem from './comment-item.vue'

export default {
  components: { commentItem },
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      limit: 10, // 总数据条数
      error: false,
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 每页大小
        })
        // console.log(data)
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 更新总数据条数
        this.$emit('onload-success', data.data)

        // 3. 将加载更多的 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，关闭加载更多
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
</style>