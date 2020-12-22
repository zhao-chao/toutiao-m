<!--
 * @Author: your name
 * @Date: 2020-12-19 14:37:20
 * @LastEditTime: 2020-12-22 14:40:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\components\collect-article\index.vue
-->
<template>
  <van-button :icon="value?'star' : 'star-o'"
              :class=" {
                  collected:value
              } "
              :loading="loading"
              @click="onCollect" />
</template>


<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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
      // 开始请求
      this.loading = true
      let r
      try {
        // 是否收藏
        if (this.value) {
          // 父组件 传递articleId
          r = deleteCollect(this.articleId)
        } else {
          r = await addCollect(this.articleId)
        }
        if (!r) {
          return this.$toast.fail('操作失败，请重试')
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      // 请求结束
      this.loading = false
    },
  },
}
</script>
<style scoped lang='less'>
.btn-item {
  position: relative;
  left: 35px;
  border-color: #fff;
  font-size: 40px;
}
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
