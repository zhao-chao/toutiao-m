<!--
 * @Author: your name
 * @Date: 2020-12-19 14:37:20
 * @LastEditTime: 2020-12-20 11:31:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\components\collect-article\index.vue
-->
<template>
  <van-button class="btn-item1"
              :icon="value === 1?'good-job' : 'good-job-o'"
              :class=" {
                  liked:value ===1
              } "
              :loading="loading"
              @click="onCollect" />
</template>


<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'likeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCollect() {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.loading = true

      try {
        //xhr.status:获取当前服务器的响应状态  200=>成功
        let status = -1
        // 如果已经点赞，则取消点赞
        if (this.value === 1) {
          deleteLike(this.articleId)
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          //xhr.status:获取当前服务器的响应状态  200=>成功
          status = 1
        }
        this.$emit('input', status)
        //xhr.status:获取当前服务器的响应状态  200=>成功
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        // console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    },
  },
}
</script>
<style scoped lang='less'>
.btn-item1 {
  font-size: 40px;
  border-color: #fff;
}
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
