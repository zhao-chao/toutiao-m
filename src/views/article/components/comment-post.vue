<!--
 * @Author: your name
 * @Date: 2020-12-21 09:28:44
 * @LastEditTime: 2020-12-21 22:04:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\article\components\comment-post.vue
-->
<template>
  <div class="comment-post">
    <van-field class="post-field"
               v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="请输入留言"
               show-word-limit />
    <van-button class="post-btn"
                @click="onAddComment"
                :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onAddComment() {
      this.$toast.loading({
        message: '发布中。。。',
        forbidClick: true,
        duration: 0,
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(), //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, //评论内容
          art_id: this.articleId ? this.articleId.toString() : this.articleId,
        })

        // 清空文本框
        this.message = ''
        // 关闭弹出层
        // 将发布内容置顶
        this.$emit('post-success', data.data)
        // console.log(data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>